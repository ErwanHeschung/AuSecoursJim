import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import { PaymentLayoutComponent } from '../../layouts/payment-layout/payment-layout.component';
import { ErrorBannerComponent } from '../../shared/components/error-banner/error-banner.component';
import { BasketService } from '../../shared/services/basket.service';
import { Basket } from '../../core/models/basket.model';
import { BasketItem } from '../../core/models/item.model';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/utils/constant';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { PersonList } from '../../core/models/person-list.model';
import Keyboard from 'simple-keyboard';
import { Group } from '../../core/models/group.model';
import { GroupBasketService } from '../../shared/services/group-basket.service';

type BasketSelected = {
  basketItems: BasketItem;
  selected: number[];
};

@Component({
  selector: 'app-split-payment',
  standalone: true,
  templateUrl: './split-payment.component.html',
  styleUrls: ['./split-payment.component.scss'],
  imports: [
    CommonModule,
    CounterComponent,
    PaymentLayoutComponent,
    ErrorBannerComponent,
  ],
})
export class SplitPaymentComponent {
  private readonly STORAGE_KEY = 'payment';
  protected showError: boolean = false;
  protected basket!: Basket;
  protected groupBasket!: Basket;
  protected items!: BasketSelected[];
  protected numberOfPersons: number = 1;
  protected groupId: number;
  protected groupAmount: number = 135;
  protected isOwner: boolean = false;
  protected totalOrder: number = 0;
  protected mode: 'euro' | 'items' = 'euro';

  persons = [{ name: 'Person 1', amount: 0, isOwner: false }];

  constructor(
    private basketService: BasketService,
    private groupBasketService: GroupBasketService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    const saved = this.localStorageService.getItem<PersonList>(
      this.STORAGE_KEY
    );
    const group: Group | null = this.localStorageService.getItem('group');
    this.groupId = group ? group.groupId : -1;
    console.log('Loaded group from storage:', group);
    if (saved) {
      this.router.navigate([ROUTES.payment]);
    }
  }

  ngOnInit() {
    this.updatePersonsCount();
    this.basketService.basket$.subscribe(basket => {
      this.basket = basket;

      this.items = basket.items.flatMap(item =>
        Array.from({ length: item.quantity }, () => ({
          basketItems: item,
          selected: [],
        }))
      );

      this.totalOrder = this.basketService.getTotal();
    });

    this.groupBasketService.basket$.subscribe(groupBasket => {
      this.groupBasket = groupBasket;
    });
    this.groupAmount = this.groupBasketService.getTotal();
  }

  get currentTotal(): number {
    return this.persons.reduce((sum, p) => sum + p.amount, 0);
  }

  onNumberOfPersonsChanged(newCount: number) {
    if (newCount > this.numberOfPersons) {
      for (let i = this.numberOfPersons + 1; i <= newCount; i++) {
        this.persons.push({ name: `Person ${i}`, amount: 0, isOwner: false });
      }
    } else if (newCount < this.numberOfPersons) {
      this.persons.splice(newCount);
    }

    this.numberOfPersons = newCount;

    this.items.forEach(item => {
      item.selected = [];
    });

    this.refreshAmountPerPerson();

    this.updatePersonsCount();
  }

  refreshAmountPerPerson() {
    this.items.forEach(item => {
      item.selected = [];
    });

    if (this.mode == 'items') {
      this.persons.forEach(p => (p.amount = 0));
    } else if (this.mode == 'euro') {
      const baseAmount = this.totalOrder / this.persons.length;
      this.persons.forEach(p => (p.amount = baseAmount));
    }
  }

  onModeChange(newMode: 'euro' | 'items') {
    this.mode = newMode;
    this.persons.forEach(p => (p.amount = 0));

    this.refreshAmountPerPerson();
  }

  toggleItemSelection(itemIndex: number, personIndex: number) {
    const selected = this.items[itemIndex].selected;
    if (selected.includes(personIndex)) {
      this.items[itemIndex].selected = selected.filter(i => i !== personIndex);
    } else {
      selected.push(personIndex);
    }
    this.computeAmountPerPersonItemMode();
  }

  computeAmountPerPersonItemMode(): void {
    this.persons.forEach(p => (p.amount = 0));
    this.items.forEach(item => {
      const numSelected = item.selected.length;
      if (numSelected > 0) {
        const amountPerPerson = item.basketItems.price / numSelected;
        item.selected.forEach(personIndex => {
          this.persons[personIndex].amount += amountPerPerson;
        });
      }
    });
  }

  validateForm(): void {
    if (this.persons.length < 2) {
      this.persons[0].amount = this.totalOrder;
      this.showError = false;
    } else if (this.mode === 'euro') {
      this.showError = this.currentTotal !== this.totalOrder;
    } else if (this.mode === 'items') {
      const allSelected = this.items.every(item => item.selected.length > 0);
      this.showError = !allSelected;
      if (allSelected) {
        this.computeAmountPerPersonItemMode();
      }
    }
    if (!this.showError) {
      if (this.groupId != -1 && this.isOwner) {
        this.persons[0].amount += this.groupAmount;
        this.persons[0].isOwner = true;
      }
      this.processPayment();
    }
  }

  private processPayment(): void {
    this.save();
    this.router.navigate([ROUTES.payment]);
  }

  setOwnerPay() {
    this.isOwner = !this.isOwner;
  }

  private updatePersonsCount() {
    document.documentElement.style.setProperty(
      '--persons-count',
      this.persons.length.toString()
    );
  }

  formatAmount(amount: number): string {
    return parseFloat(amount.toFixed(2)).toString();
  }

  private save(): void {
    const filteredPersons = this.persons.filter(p => p.amount > 0);
    const personList: PersonList = {
      persons: filteredPersons.map((p, index) => ({
        name: p.name,
        amount: p.amount,
        hasPayed: false,
        isOwner: p.isOwner || false,
      })),
    };
    this.localStorageService.setItem<PersonList>(this.STORAGE_KEY, personList);
  }

  private keyboard!: Keyboard;
  activeInputIndex: number | null = null;
  keyboardVisible: boolean = false;

  onInputFocus(index: number, currentValue: number) {
    this.activeInputIndex = index;
    if (this.keyboard) {
      this.keyboard.setInput(currentValue.toString());
    }
    this.keyboardVisible = true;
  }

  hideKeyboard() {
    this.keyboardVisible = false;
    this.activeInputIndex = null;
  }

  ngAfterViewInit() {
    const container = document.querySelector('.simple-keyboard') as HTMLElement;
    if (!container) return;
    this.keyboard = new Keyboard({
      onChange: input => this.onKeyboardChange(input),
      onKeyPress: button => this.onKeyPress(button),
      layout: {
        default: ['1 2 3', '4 5 6', '7 8 9', '{bksp} 0 .'],
      },
      theme: 'hg-theme-default hg-layout-numeric numeric-theme',
    });
  }

  onKeyboardChange(input: string) {
    if (this.activeInputIndex !== null) {
      const person = this.persons[this.activeInputIndex];
      const parsed = parseFloat(input.replace(',', '.'));
      person.amount = isNaN(parsed) ? 0 : parsed;
    }
  }

  onKeyPress(button: string) {
    if (button === '{bksp}') {
      const input = this.keyboard.getInput();
      this.keyboard.setInput(input.slice(0, -1));
      this.onKeyboardChange(this.keyboard.getInput());
    }
  }

  ngOnDestroy() {
    this.keyboard = undefined as any;
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (
      target.closest('.simple-keyboard-wrapper') ||
      target.classList.contains('input')
    ) {
      return;
    }

    this.hideKeyboard();
  }
}

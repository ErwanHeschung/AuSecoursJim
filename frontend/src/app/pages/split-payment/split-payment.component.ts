import { Component, Inject } from '@angular/core';
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
import { SliderComponent } from '../../shared/components/slider/slider.component';

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
    SliderComponent,
    PaymentLayoutComponent,
    ErrorBannerComponent,
  ],
})
export class SplitPaymentComponent {
  private readonly STORAGE_KEY = 'payment';
  showError: boolean = false;
  basket!: Basket;
  items!: BasketSelected[];
  numberOfPersons: number = 1;
  totalOrder: number = 0;
  mode: 'euro' | 'items' = 'euro';

  persons = [{ name: 'Personne 1', amount: 0 }];

  constructor(
    private basketService: BasketService,
    private localStorageService: LocalStorageService,
    private router: Router
  ) {
    const saved = this.localStorageService.getItem<PersonList>(
      this.STORAGE_KEY
    );
    if (saved) {
      console.log('Saved payment data found. Redirect to payment page');
      this.router.navigate([ROUTES.payment]);
    }
  }

  ngOnInit() {
    this.updatePersonsCount();
    this.basketService.basket$.subscribe(basket => {
      this.basket = basket;
      this.items = basket.items.map(item => ({
        basketItems: item,
        selected: [],
      }));
      this.totalOrder = this.basketService.getTotal();
    });
  }

  get currentTotal(): number {
    return this.persons.reduce((sum, p) => sum + p.amount, 0);
  }

  onNumberOfPersonsChanged(newCount: number) {
    if (newCount > this.numberOfPersons) {
      for (let i = this.numberOfPersons + 1; i <= newCount; i++) {
        this.persons.push({ name: `Personne ${i}`, amount: 0 });
      }
    } else if (newCount < this.numberOfPersons) {
      this.persons.splice(newCount);
    }

    this.numberOfPersons = newCount;
    this.updatePersonsCount();
    const baseAmount =
      Math.floor((this.totalOrder / this.persons.length) * 2) / 2;
    this.persons.forEach(p => (p.amount = baseAmount));
  }

  onModeChange(newMode: 'euro' | 'items') {
    this.mode = newMode;
  }

  toggleItemSelection(itemIndex: number, personIndex: number) {
    const selected = this.items[itemIndex].selected;
    if (selected.includes(personIndex)) {
      this.items[itemIndex].selected = selected.filter(i => i !== personIndex);
    } else {
      selected.push(personIndex);
    }
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
      this.processPayment();
    }
  }

  private processPayment(): void {
    this.save();
    console.log('Redirect to payment page');
    this.router.navigate([ROUTES.payment]);
  }

  private updatePersonsCount() {
    document.documentElement.style.setProperty(
      '--persons-count',
      this.persons.length.toString()
    );
  }

  private save(): void {
    const filteredPersons = this.persons.filter(p => p.amount > 0);
    const personList: PersonList = {
      persons: filteredPersons.map((p, index) => ({
        name: p.name,
        amount: p.amount,
        hasPayed: false,
      })),
    };
    this.localStorageService.setItem<PersonList>(this.STORAGE_KEY, personList);
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import { PaymentLayoutComponent } from '../../layouts/payment-layout/payment-layout.component';
import { ErrorBannerComponent } from '../../shared/components/error-banner/error-banner.component';
import { BasketService } from '../../shared/services/basket.service';
import { Basket } from '../../core/models/basket.model';
import { BasketItem } from '../../core/models/item.model';

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
  showError: boolean = false;
  basket!: Basket;
  items!: BasketSelected[];
  numberOfPersons: number = 2;
  totalOrder: number = 0;
  mode: 'euro' | 'items' = 'euro';

  persons = [
    { name: 'Personne 1', amount: 0 },
    { name: 'Personne 2', amount: 0 },
  ];

  constructor(private basketService: BasketService) {}

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

  validateForm(): void {
    // Vérification (ici forcée à faux pour test)
    if (this.currentTotal !== this.totalOrder) {
      this.showError = true;
    } else {
      // TODO: redirect to payment
    }
  }

  triggerError() {
    this.showError = true;
  }

  private updatePersonsCount() {
    document.documentElement.style.setProperty(
      '--persons-count',
      this.persons.length.toString()
    );
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';
import { PaymentLayoutComponent } from '../../layouts/payment-layout/payment-layout.component';
import { ErrorBannerComponent } from '../../shared/components/error-banner/error-banner.component';
import { BasketService } from '../../shared/services/basket.service';
import { Basket } from '../../core/models/basket.model';
import { BasketItem } from '../../core/models/item.model';
import { OrderService } from '../../shared/services/no-bff/order.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/utils/constant';

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

  constructor(
    private basketService: BasketService,
    private orderService: OrderService,
    private router: Router
  ) {}

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
    if (this.mode === 'euro') {
      this.showError = this.currentTotal !== this.totalOrder;
    } else {
      const allSelected = this.items.every(item => item.selected.length > 0);
      this.showError = !allSelected;
    }
    if (!this.showError) {
      this.orderService
        .prepareOrderOnFirstFreeOrderNumber(this.basket)
        .subscribe(() => {
          this.trackOrder();
        });
    }
  }

  private updatePersonsCount() {
    document.documentElement.style.setProperty(
      '--persons-count',
      this.persons.length.toString()
    );
  }

  private trackOrder() {
    this.orderService.latestOrderId$.subscribe((orderId: string | null) => {
      if (orderId) {
        this.router.navigate(['order-tracking', orderId]);
      }
    });
  }
}

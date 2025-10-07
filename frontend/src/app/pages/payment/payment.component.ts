import { afterNextRender, Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentLayoutComponent } from '../../layouts/payment-layout/payment-layout.component';
import { Router } from '@angular/router';
import { IOrderService } from '../../core/models/interfaces/order';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Person } from '../../core/models/person.model';
import { IPaymentService } from '../../core/models/interfaces/payment';
import { BasketService } from '../../shared/services/basket.service';
import { Basket } from '../../core/models/basket.model';
import { PersonList } from '../../core/models/person-list.model';

@Component({
  selector: 'app-payment',
  standalone: true,
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss'],
  imports: [CommonModule, PaymentLayoutComponent],
})
export class PaymentComponent {
  private people: PersonList = { persons: [] };
  private readonly STORAGE_KEY = 'payment';
  private currentPersonIndex: number = 0;
  private basket!: Basket;

  constructor(
    @Inject('ORDER_SERVICE') private orderService: IOrderService,
    @Inject('PAYMENT_SERVICE') private paymentService: IPaymentService,
    private localStorageService: LocalStorageService,
    private basketService: BasketService,
    private router: Router
  ) {
    const saved = this.localStorageService.getItem<PersonList>(
      this.STORAGE_KEY
    );
    if (saved) {
      this.people = saved;
      this.currentPersonIndex = this.people.persons
        .map(p => p.hasPayed)
        .indexOf(false);
    } else {
      console.log('No saved payment data found.');
    }
  }

  ngOnInit() {
    this.basketService.basket$.subscribe(basket => {
      this.basket = basket;
    });
    this.trackOrder();
  }

  get currentPerson(): Person {
    return this.people.persons[this.currentPersonIndex];
  }

  validateForm(): void {
    if (this.currentPersonIndex < this.people.persons.length - 1) {
      this.people.persons[this.currentPersonIndex].hasPayed = true;
      this.paymentService.pay(this.currentPerson.amount).subscribe((result: boolean) => {
        this.save();
        this.currentPersonIndex = this.people.persons.map(p => p.hasPayed).indexOf(false);
      }); 
    } else {
      console.log('All payments completed. Order can be created');
      this.createOrder();
    }
  }

  private createOrder(): void {
    this.orderService
      .prepareOrderOnFirstFreeOrderNumber(this.basket).subscribe();
  }

  private trackOrder() {
    this.orderService.latestOrderId$.subscribe((orderId: string | null) => {
      if (orderId) {
        this.router.navigate(['order-tracking', orderId]);
      }
    });
  }

  private save(): void {
    this.localStorageService.setItem<PersonList>(this.STORAGE_KEY, this.people);
  }
}

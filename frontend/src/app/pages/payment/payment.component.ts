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
import { ROUTES } from '../../core/utils/constant';
import { GroupService } from '../../shared/services/no-bff/group.service';
import { Group } from '../../core/models/group.model';
import { GroupBasketService } from '../../shared/services/group-basket.service';

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
  private basketGroup!: Basket;
  private group!: Group | null;

  constructor(
    @Inject('ORDER_SERVICE') private orderService: IOrderService,
    @Inject('PAYMENT_SERVICE') private paymentService: IPaymentService,
    private localStorageService: LocalStorageService,
    private basketService: BasketService,
    private groupBasketService: GroupBasketService,
    private router: Router,
    private groupService: GroupService
  ) {
    this.group = this.localStorageService.getItem<Group>('group');

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
    this.groupBasketService.basket$.subscribe(groupBasket => {
      this.basketGroup = groupBasket;
    });
  }

  get currentPerson(): Person {
    return this.people.persons[this.currentPersonIndex];
  }

  validateForm(): void {
    let currentPerson = this.people.persons[this.currentPersonIndex];
    currentPerson.hasPayed = true;
    if (currentPerson.isOwner && this.group) {
      this.groupService.closeGroup(this.group.groupId).subscribe();
    }
    this.paymentService
      .pay(this.currentPerson.amount)
      .subscribe((result: boolean) => {
        this.save();

        const nextIndex = this.people.persons.findIndex(p => !p.hasPayed);

        if (nextIndex !== -1) {
          this.currentPersonIndex = nextIndex;
        } else {
          this.currentPersonIndex = this.people.persons.length - 1;
          this.createOrder();
          this.addOrderToGroup();
          this.trackOrder();
        }
      });
  }

  private createOrder(): void {
    const mergedBasket: Basket = {
      _id: this.basket._id ?? this.basketGroup._id,
      items: [...(this.basket.items || []), ...(this.basketGroup.items || [])],
    };

    this.orderService
      .prepareOrderOnFirstFreeOrderNumber(mergedBasket)
      .subscribe();
  }

  private trackOrder() {
    this.orderService.latestOrderId$.subscribe((orderId: string | null) => {
      if (orderId) {
        this.router.navigate([ROUTES.orderTrackingQRcode]);
      }
    });
  }

  private save(): void {
    this.localStorageService.setItem<PersonList>(this.STORAGE_KEY, this.people);
  }

  private addOrderToGroup(){
    this.orderService.latestOrderId$.subscribe((orderId: string | null) => {
      if (orderId && this.group) {
        this.groupService.addOrderToGroup(this.group.groupId,orderId).subscribe();
      }
    });
  }
}

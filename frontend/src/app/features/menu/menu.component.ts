import { Component } from '@angular/core';
import { ItemComponent } from '../../shared/components/item/item.component';
import { CategoryItemComponent } from '../../shared/components/category-item/category-item.component';
import { OrderType } from '../../core/models/order-type.model';
import { PaymentMethod } from '../../core/models/payment-method.model';
import { Order } from '../../core/models/order.model';
import { OrderStatus } from '../../core/models/order-status.model';
import { ICONS } from '../../core/utils/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-menu',
  imports: [ItemComponent, CategoryItemComponent, FontAwesomeModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  protected ICONS = ICONS;

  protected order: Order = {
    id: 0,
    status: OrderStatus.IN_PROGRESS,
    type: OrderType.DINE_IN,
    payment: PaymentMethod.KIOSK,
    amount: 20,
    amountSplits: [],
    quantity: 2,
    items: [
      {
        id: 0,
        name: 'burger',
        image: 'https://blog.swiggy.com/wp-content/uploads/2025/01/Image-9_-meat-burger-1024x538.png',
        price: 10,
        quantity: 2
      }
    ],
  }


}

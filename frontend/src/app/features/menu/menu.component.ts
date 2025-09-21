import { Component } from '@angular/core';
import { ItemComponent } from '../../shared/components/item/item.component';
import { CategoryItemComponent } from '../../shared/components/category-item/category-item.component';
import { OrderType } from '../../core/models/order-type.model';
import { PaymentMethod } from '../../core/models/payment-method.model';
import { Order } from '../../core/models/order.model';
import { OrderStatus } from '../../core/models/order-status.model';
import { ICONS } from '../../core/utils/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Item } from '../../core/models/item.model';
import { Category } from '../../core/models/category.model';

@Component({
  selector: 'app-menu',
  imports: [ItemComponent, CategoryItemComponent, FontAwesomeModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

  protected ICONS = ICONS;

  protected categories: Category[] = [
    {
        id: 0,
        name: "Burgers",
        image: "https://blog.swiggy.com/wp-content/uploads/2025/01/Image-9_-meat-burger-1024x538.png"
    },
    {
        id: 1,
        name: "Fast Food",
        image: "https://blog.swiggy.com/wp-content/uploads/2025/01/Image-9_-meat-burger-1024x538.png"
    },
    {
        id: 2,
        name: "Snacks",
        image: "https://blog.swiggy.com/wp-content/uploads/2025/01/Image-9_-meat-burger-1024x538.png"
    }
  ];

  protected selectedCategory: Category = this.categories[0];

  protected items: Item[] = [
    {
      id: 0,
      name: 'burger',
      image: 'https://blog.swiggy.com/wp-content/uploads/2025/01/Image-9_-meat-burger-1024x538.png',
      price: 10,
      quantity: 2,
      ingredients: [
        { name: 'bun', quantity: 1 },
        { name: 'beef patty', quantity: 1 },
        { name: 'cheese', quantity: 1 },
        { name: 'lettuce', quantity: 1 },
      ],
    },
    {
      id: 1,
      name: 'pizza',
      image: 'https://blog.swiggy.com/wp-content/uploads/2025/01/Image-9_-meat-burger-1024x538.png',
      price: 12,
      quantity: 2,
      ingredients: [
        { name: 'dough', quantity: 1 },
        { name: 'tomato sauce', quantity: 1 },
        { name: 'mozzarella', quantity: 1 },
        { name: 'pepperoni', quantity: 5 },
      ],
    },
    {
      id: 2,
      name: 'taco',
      image: 'https://blog.swiggy.com/wp-content/uploads/2025/01/Image-9_-meat-burger-1024x538.png',
      price: 8,
      quantity: 2,
      ingredients: [
        { name: 'tortilla', quantity: 1 },
        { name: 'ground beef', quantity: 1 },
        { name: 'cheese', quantity: 1 },
        { name: 'salsa', quantity: 1 },
      ],
    },
    {
      id: 3,
      name: 'wrap',
      image: 'https://blog.swiggy.com/wp-content/uploads/2025/01/Image-9_-meat-burger-1024x538.png',
      price: 9,
      quantity: 2,
      ingredients: [
        { name: 'tortilla', quantity: 1 },
        { name: 'chicken', quantity: 1 },
        { name: 'lettuce', quantity: 1 },
        { name: 'mayo', quantity: 1 },
      ],
    },
  ];



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
        quantity: 2,
        ingredients: [],
      }
    ],
  }


  protected switchCategory(category: Category): void {
    this.selectedCategory = category;
    // TODO: Ask service to retrieve items of the selected category
    console.log(category);
  }

  protected openItemDetails(item: Item): void {
    // TODO: Open item details popup
    console.log(item);
  }

}

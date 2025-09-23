import { Component, Input } from '@angular/core';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
})
export class ItemComponent {
  @Input() item: Item = {
    id: 0,
    name: 'Burger',
    image: 'https://via.placeholder.com/150',
    price: 10.69,
    quantity: 1,
    ingredients: [],
  };
}

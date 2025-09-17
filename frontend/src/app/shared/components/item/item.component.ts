import { Component, Input } from '@angular/core';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-item',
  imports: [],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss'
})
export class ItemComponent {

  @Input() item: Item = new Item();

}

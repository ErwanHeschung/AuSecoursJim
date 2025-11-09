import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Item } from '../../../core/models/item.model';

@Component({
  selector: 'app-group-item',
  standalone: true,
  imports: [],
  templateUrl: './group-item.component.html',
  styleUrls: ['./group-item.component.scss'],
})
export class GroupItemComponent {
  @Input() item!: Item;
  @Input() quantity = 0;
}

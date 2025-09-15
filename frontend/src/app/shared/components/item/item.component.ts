import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {
  @Input() title: string = 'Burger';
  @Input() price: number = 10.69;
  @Input() imageUrl: string = 'https://via.placeholder.com/150';
}

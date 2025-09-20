import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-category-item',
  imports: [],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss'
})
export class CategoryItemComponent {
  @Input() title: string = 'Burgers';
  @Input() imageUrl: string = 'https://via.placeholder.com/150';
}

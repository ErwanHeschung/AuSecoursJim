import { Component, Input } from '@angular/core';
import { Category } from '../../../core/models/category.model';

@Component({
  selector: 'app-category-item',
  imports: [],
  templateUrl: './category-item.component.html',
  styleUrl: './category-item.component.scss',
})
export class CategoryItemComponent {
  @Input() category: Category = {
    id: 1,
    name: 'Burgers',
    image: 'https://via.placeholder.com/150',
  };

  @Input() selected: boolean = false;
}

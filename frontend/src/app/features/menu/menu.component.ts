import { Component } from '@angular/core';
import { ItemComponent } from '../../shared/components/item/item.component';
import { CategoryItemComponent } from '../../shared/components/category-item/category-item.component';

@Component({
  selector: 'app-menu',
  imports: [ItemComponent, CategoryItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {

}

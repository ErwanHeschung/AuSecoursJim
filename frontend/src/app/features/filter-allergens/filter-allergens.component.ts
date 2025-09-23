import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Allergen } from '../../core/models/allergen.model';

@Component({
  selector: 'app-filter-allergens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-allergens.component.html',
  styleUrls: ['./filter-allergens.component.scss'],
})
export class FilterAllergensComponent {
  selectedAllergens: string[] = [];

  @Output() allergensChange = new EventEmitter<Allergen[]>();

  allergens: (Allergen & { selected?: boolean })[] = [
    { id: 0, name: 'Gluten', image: '🍞' },
    { id: 1, name: 'Arachides', image: '🥜' },
    { id: 2, name: 'Lait', image: '🥛' },
    { id: 3, name: 'Œufs', image: '🥚' },
    { id: 4, name: 'Poissons', image: '🐟' },
    { id: 5, name: 'Soja', image: '🌱' },
    { id: 6, name: 'Fruits à coque', image: '🌰' },
  ];

  trackByAllergen(index: number, allergen: Allergen) {
    return allergen.id;
  }

  onCheckboxChange() {
    const selected = this.allergens.filter(a => a.selected);
    this.allergensChange.emit(selected);
  }

  getSelectedAllergens() {
    return this.allergens.filter(a => a.selected);
  }
}

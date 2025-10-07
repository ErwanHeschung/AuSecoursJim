import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AllergenService } from '../../services/no-bff/allergen.service';
import { Allergen } from '../../../core/models/allergen.model';

@Component({
  selector: 'app-filter-allergens',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-allergens.component.html',
  styleUrls: ['./filter-allergens.component.scss'],
})
export class FilterAllergensComponent implements OnInit {
  @Output() allergensChange = new EventEmitter<Allergen[]>();
  @Input() preSelectedAllergens: Allergen[] = [];

  allergens: (Allergen & { selected?: boolean })[] = [];

  constructor(private allergenService: AllergenService) {}

  ngOnInit() {
    this.allergenService.getAllergens().subscribe((allergens: Allergen[]) => {
      this.allergens = allergens.map(a => ({
        ...a,
        selected: this.preSelectedAllergens.some(sel => sel.id === a.id),
      }));
    });
  }

  trackByAllergen(index: number, allergen: Allergen) {
    return allergen.id;
  }

  onCheckboxChange() {
    const selected = this.allergens.filter(a => a.selected);
    this.allergensChange.emit(selected);
  }

  getSelectedAllergens(): string[] {
    return this.allergens.filter(a => a.selected).map(a => a.display);
  }
}

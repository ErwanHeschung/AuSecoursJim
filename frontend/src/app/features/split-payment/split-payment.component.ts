import { Component } from '@angular/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CounterComponent } from '../../shared/components/quantity-counter/quantity-counter.component';

@Component({
  selector: 'app-split-payment',
  standalone: true,
  templateUrl: './split-payment.component.html',
  styleUrls: ['./split-payment.component.scss'],
  imports: [CommonModule, CounterComponent]
})
export class SplitPaymentComponent {
  numberOfPersons = 2;
  totalOrder = 20;
  mode: 'euro' | 'items' = 'euro';

  persons = [
    { name: 'Personne 1', amount: 10 },
    { name: 'Personne 2', amount: 10 }
  ];

  items = [
    { name: 'Burger', price: 5.5, image: '/burger.png', selected: [] as number[] },
    { name: 'Burger', price: 5.5, image: '/burger.png', selected: [] as number[] },
  ];

  ngOnInit() {
    this.updatePersonsCount();
  }

  get currentTotal(): number {
    return this.persons.reduce((sum, p) => sum + p.amount, 0);
  }

  onNumberOfPersonsChanged(newCount: number) {
    if (newCount > this.numberOfPersons) {
      for (let i = this.numberOfPersons + 1; i <= newCount; i++) {
        this.persons.push({ name: `Personne ${i}`, amount: 0 });
      }
    } else if (newCount < this.numberOfPersons) {
      this.persons.splice(newCount);
    }

    this.numberOfPersons = newCount;
    this.updatePersonsCount();
  }

  onModeChange(newMode: 'euro' | 'items') {
    this.mode = newMode;
  }

  toggleItemSelection(itemIndex: number, personIndex: number) {
    const selected = this.items[itemIndex].selected;
    if (selected.includes(personIndex)) {
      this.items[itemIndex].selected = selected.filter(i => i !== personIndex);
    } else {
      selected.push(personIndex);
    }
  }

  private updatePersonsCount() {
    document.documentElement.style.setProperty('--persons-count', this.persons.length.toString());
  }
}

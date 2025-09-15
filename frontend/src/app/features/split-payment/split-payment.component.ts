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

  persons = [
    { name: 'Personne 1', amount: 10 },
    { name: 'Personne 2', amount: 10 }
  ];

  get total(): number {
    return this.totalOrder;
  }

  get currentTotal(): number {
    return this.persons.reduce((sum, p) => sum + p.amount, 0);
  }

  onNumberOfPersonsChanged(newCount: number) {
  console.log('Number of persons changed to:', newCount);

  if (newCount > this.numberOfPersons) {
    for (let i = this.numberOfPersons + 1; i <= newCount; i++) {
      this.persons.push({ name: `Personne ${i}`, amount: 0 });
    }
  } else if (newCount < this.numberOfPersons) {
    this.persons.splice(newCount);
  }

  this.numberOfPersons = newCount;
}

}

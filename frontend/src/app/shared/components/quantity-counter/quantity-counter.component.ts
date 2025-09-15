import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './quantity-counter.component.html',
  styleUrls: ['./quantity-counter.component.scss'],
})
export class CounterComponent {
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  increase() {
    this.value++;
    this.valueChange.emit(this.value);
  }

  decrease() {
    if (this.value > 0) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }
}

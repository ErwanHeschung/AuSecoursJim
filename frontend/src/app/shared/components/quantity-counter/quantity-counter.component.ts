import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './quantity-counter.component.html',
  styleUrls: ['./quantity-counter.component.scss'],
})
export class CounterComponent {
  @Input() min: number = 1;
  @Input() max: number = 6;
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  increase() {
    if (this.value < this.max) {
      this.value++;
      this.valueChange.emit(this.value);
    }
  }

  decrease() {
    if (this.value > this.min) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }

  get isDecreaseDisabled(): boolean {
    return this.value <= this.min;
  }

  get isIncreaseDisabled(): boolean {
    return this.value >= this.max;
  }
}

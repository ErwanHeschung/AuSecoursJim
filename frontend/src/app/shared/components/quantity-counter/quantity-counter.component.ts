import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './quantity-counter.component.html',
  styleUrls: ['./quantity-counter.component.scss'],
})
export class CounterComponent {
  @Input() limit: number = 6;
  @Input() value: number = 0;
  @Output() valueChange = new EventEmitter<number>();

  increase() {
    if (this.value < this.limit) {
      this.value++;
      this.valueChange.emit(this.value);
    }
  }

  decrease() {
    if (this.value > 0) {
      this.value--;
      this.valueChange.emit(this.value);
    }
  }

  get isDecreaseDisabled(): boolean {
    return this.value <= 0;
  }

  get isIncreaseDisabled(): boolean {
    return this.value >= this.limit;
  }
}

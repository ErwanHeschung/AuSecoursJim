import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent {
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

import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  imports: [CommonModule],
  templateUrl: './progress-bar.component.html',
  styleUrl: './progress-bar.component.scss'
})
export class ProgressBarComponent {

  @Input() stepNumber: number = 2;
  @Input() currentStep: number = 1;

  get steps(): number[] {
    return Array.from({ length: this.stepNumber }, (_, i) => i);
  }

}

import { NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-payment-layout',
  imports: [NgIf],
  templateUrl: './payment-layout.component.html',
  styleUrl: './payment-layout.component.scss',
})
export class PaymentLayoutComponent {
  @Input() groupId: string = '';
  @Input() nbPersons: number = 0;
  showButtons: boolean = false;

  ngOnInit(): void {
    this.showButtons = this.nbPersons > 0 && this.groupId !== '';
    console.log(
      'PaymentLayoutComponent initialized with groupId:',
      this.groupId,
      'and nbPersons:',
      this.nbPersons
    );
  }
}

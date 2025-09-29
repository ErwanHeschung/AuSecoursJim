import { Component, Inject } from '@angular/core';
import { ICONS } from '../../core/utils/icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { OptionSelectionLayoutComponent } from '../../layouts/option-selection-layout/option-selection-layout/option-selection-layout.component';
import { IPaymentService } from '../../core/models/interfaces/payment';

@Component({
  selector: 'app-payment-selection',
  imports: [OptionSelectionLayoutComponent],
  templateUrl: './payment-selection.component.html',
  styleUrl: './payment-selection.component.scss',
})
export class PaymentSelectionComponent {
  public options: {
    label: string;
    icon: IconDefinition;
    onClick: () => void;
  }[] = [
    { label: 'Espece', icon: ICONS['money'], onClick: () => this.selectCash() },
    { label: 'Carte', icon: ICONS['card'], onClick: () => this.selectCard() },
  ];

  constructor(
    @Inject('PAYMENT_SERVICE') private paymentService: IPaymentService
  ) {}

  selectCash() {
    this.paymentService.pay().subscribe(result => console.log(result));
    //TODO Redirect to cash payment
  }

  selectCard() {
    this.paymentService.pay().subscribe(result => console.log(result));
    //TODO Redirect to card payment
  }
}

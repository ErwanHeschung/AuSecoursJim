import { Component, Inject } from '@angular/core';
import { ICONS } from '../../core/utils/icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { OptionSelectionLayoutComponent } from '../../layouts/option-selection-layout/option-selection-layout/option-selection-layout.component';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/utils/constant';

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
    { label: 'Cash', icon: ICONS['money'], onClick: () => this.selectCash() },
    { label: 'Card', icon: ICONS['card'], onClick: () => this.selectCard() },
  ];

  constructor(private router: Router) {}

  selectCash() {
    //TODO do payment
  }

  selectCard() {
    this.router.navigate([ROUTES.splitPayment]);
  }
}

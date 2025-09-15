import { Component } from '@angular/core';
import { ICONS } from '../../core/utils/icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { OptionSelectionLayoutComponent } from "../../layouts/option-selection-layout/option-selection-layout/option-selection-layout.component";

@Component({
  selector: 'app-payment-selection',
  imports: [OptionSelectionLayoutComponent],
  templateUrl: './payment-selection.component.html',
  styleUrl: './payment-selection.component.scss'
})
export class PaymentSelectionComponent {
  public options: { label: string; icon: IconDefinition; onClick: () => void }[] = [
    { label: 'Espece', icon: ICONS['money'], onClick: () => this.selectCash() },
    { label: 'Carte', icon: ICONS['card'], onClick: () => this.selectCard() }
  ];

  selectCash() {
    //TODO Redirect to cash payment
  }

  selectCard() {
    //TODO Redirect to card payment
  }
}

import { Component, Input } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-option-selection-layout',
  imports: [FontAwesomeModule],
  templateUrl: './option-selection-layout.component.html',
  styleUrl: './option-selection-layout.component.scss'
})
export class OptionSelectionLayoutComponent {
  @Input() options: { label: string, icon: IconDefinition, onClick: () => void }[] = [];

}

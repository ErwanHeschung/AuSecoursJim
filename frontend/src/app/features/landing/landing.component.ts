import { Component } from '@angular/core';
import { OptionSelectionLayoutComponent } from "../../layouts/option-selection-layout/option-selection-layout/option-selection-layout.component";
import { ICONS } from '../../core/utils/icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { LocalStorageService } from '../../shared/services/local-storage-service.service';

@Component({
  selector: 'app-landing',
  imports: [OptionSelectionLayoutComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  public options: { label: string; icon: IconDefinition; onClick: () => void }[] = [
    { label: 'Sur place', icon: ICONS['dineIn'], onClick: () => this.selectDineIn() },
    { label: 'A emporter', icon: ICONS['takeaway'], onClick: () => this.selectTakeaway() }
  ];

  constructor(private localStorageService: LocalStorageService) { }

  selectTakeaway() {
    this.localStorageService.setItem('orderType', 'takeaway');
    //TODO Navigate to order page
  }

  selectDineIn() {
    this.localStorageService.setItem('orderType', 'dine-in');
    //TODO Navigate to order page
  }
}

import { Component } from '@angular/core';
import { OptionSelectionLayoutComponent } from '../../layouts/option-selection-layout/option-selection-layout/option-selection-layout.component';
import { ICONS } from '../../core/utils/icon';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { LocalStorageService } from '../../shared/services/local-storage.service';
import { Router } from '@angular/router';
import { ROUTES } from '../../core/utils/constant';
import { BasketService } from '../../shared/services/basket.service';
import { GroupBasketService } from '../../shared/services/group-basket.service';

@Component({
  selector: 'app-landing',
  imports: [OptionSelectionLayoutComponent],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent {
  public options: {
    label: string;
    icon: IconDefinition;
    onClick: () => void;
  }[] = [
      {
        label: 'Dine in',

        icon: ICONS['dineIn'],
        onClick: () => this.selectDineIn(),
      },
      {
        label: 'Takeaway',
        icon: ICONS['takeaway'],
        onClick: () => this.selectTakeaway(),
      },
    ];

  constructor(
    private localStorageService: LocalStorageService,
    private router: Router,
    private basketService: BasketService,
    private groupBasketService: GroupBasketService
  ) {
    this.localStorageService.clear();
    this.basketService.clearBasket();
    this.groupBasketService.clearBasket();
  }

  public selectTakeaway(): void {
    this.localStorageService.setItem('orderType', 'takeaway');
    this.navigateToMenus();
  }

  public selectDineIn(): void {
    this.localStorageService.setItem('orderType', 'dine-in');
    this.navigateToMenus();
  }

  private navigateToMenus(): void {
    this.router.navigate([ROUTES.menu]);
  }

  navigateToGroupCommand(): void {
    this.router.navigate([ROUTES.groupCommand]);
  }
}

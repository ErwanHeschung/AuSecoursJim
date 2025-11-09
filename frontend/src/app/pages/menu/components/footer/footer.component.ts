import { Component, OnInit } from '@angular/core';
import {
  FaIconComponent,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { ICONS } from '../../../../core/utils/icon';
import { Basket } from '../../../../core/models/basket.model';
import { BasketService } from '../../../../shared/services/basket.service';
import { BasketComponent } from '../../../../shared/components/basket/basket.component';
import { GroupBasketService } from '../../../../shared/services/group-basket.service';

@Component({
  selector: 'app-footer',
  imports: [FontAwesomeModule, BasketComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  public cartIcon: IconDefinition = ICONS['cart'];
  public basketPopup: boolean = false;
  public basket!: Basket;

  constructor(
    private basketService: BasketService,
    private groupBasketService: GroupBasketService
  ) {}

  ngOnInit() {
    this.basketService.basket$.subscribe(basket => {
      this.basket = basket;
    });
  }

  get basketQuantity(): number {
    return this.basketService.getQuantity();
  }

  get groupBasketQuantity(): number {
    return this.groupBasketService.getQuantity();
  }

  get basketPrice(): number {
    return this.basketService.getTotal();
  }

  public toggleBasketPopup(): void {
    this.basketPopup = !this.basketPopup;
  }
}

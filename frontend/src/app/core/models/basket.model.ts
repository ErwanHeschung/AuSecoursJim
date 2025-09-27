import { BasketItem } from './item.model';

export type Basket = {
  _id?: string;
  items: BasketItem[];
};

import { Allergen } from './allergen.model';
import { Ingredient } from './ingredient.model';

export type Item = {
  _id: string;
  fullName: string;
  shortName: string;
  price: number;
  category: string;
  image: string;
  ingredients?: Ingredient[];
  allergens?: string[];

};

export type BasketItem = Item & {
  quantity: number;
};

export type OrderItem = {
  menuItemId: string;
  menuItemShortName: string;
  howMany: number;
};

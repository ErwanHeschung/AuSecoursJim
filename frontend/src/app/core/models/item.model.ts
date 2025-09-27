import { Ingredient } from './ingredient.model';

export type Item = {
  _id: string;
  fullName: string;
  shortName: string;
  price: number;
  category: string;
  image: string;
  ingredients?: Ingredient[];
};

export type BasketItem = Item & {
  quantity: number;
};

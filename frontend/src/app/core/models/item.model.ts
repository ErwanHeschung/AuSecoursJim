import { Ingredient } from "./ingredient.model";

export type Item = {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
    ingredients: Ingredient[];
};
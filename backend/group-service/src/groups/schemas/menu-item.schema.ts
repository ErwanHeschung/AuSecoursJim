import { CategoryEnum } from "./category-enum.schema";

export class MenuItem {
  _id: string;
  fullName: string;
  shortName: string;
  price: number;
  category: CategoryEnum;
  image: string;
}
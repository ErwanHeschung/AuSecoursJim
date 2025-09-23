export interface MenuItem {
  id: string;
  name: string;
  pictureUrl: string;
  ingredients: { name: string; quantity: number }[];
}

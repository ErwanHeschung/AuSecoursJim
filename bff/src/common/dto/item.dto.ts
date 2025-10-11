import { ApiProperty } from '@nestjs/swagger';
import { IngredientDto } from './ingredient.dto';
import { AllergenDTO } from './allergen.dto';

export class ItemDto {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  fullName: string;

  @ApiProperty()
  shortName: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  image: string;

  @ApiProperty({ type: [IngredientDto], required: false })
  ingredients?: IngredientDto[];

  @ApiProperty({ type: [AllergenDTO], required: false })
  allergens?: AllergenDTO[];
}


export class BasketItemDto extends ItemDto {
    @ApiProperty() quantity: number;
}


export class OrderItemDto {
  @ApiProperty() menuItemId: string;
  @ApiProperty() menuItemShortName: string;
  @ApiProperty() howMany: number;
};
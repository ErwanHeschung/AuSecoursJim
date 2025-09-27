import { ApiProperty } from '@nestjs/swagger';
import { IngredientDto } from './ingredient.dto';

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
}

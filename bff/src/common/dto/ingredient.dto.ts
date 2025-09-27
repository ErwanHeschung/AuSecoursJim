import { ApiProperty } from "@nestjs/swagger";

export class IngredientDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  quantity: number;
}
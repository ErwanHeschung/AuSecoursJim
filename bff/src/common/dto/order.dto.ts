import { ApiProperty } from "@nestjs/swagger";

export class OrderDto {
  @ApiProperty() _id: string;
  @ApiProperty() tableNumber: number;
  @ApiProperty() opened: string;
  @ApiProperty() billed?: string | null;
  @ApiProperty() preparations: PreparationsShortDto[];
};

export class PreparationsShortDto {
  @ApiProperty() _id: string;
};
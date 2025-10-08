import { ApiProperty } from "@nestjs/swagger";
import { BasketItemDto } from "./item.dto";

export class BasketDto {
    @ApiProperty()
    _id?: string;
    
    @ApiProperty()
    items: BasketItemDto[];
};
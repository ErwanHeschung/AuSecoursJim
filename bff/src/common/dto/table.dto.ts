import { ApiProperty } from "@nestjs/swagger";

export class TableDto {
    @ApiProperty() _id: string;
    @ApiProperty() number: number;
    @ApiProperty() taken: boolean;
    @ApiProperty() tableOrderId: string;
};
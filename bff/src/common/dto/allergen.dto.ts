import { ApiProperty } from "@nestjs/swagger";

export class AllergenDTO {
    @ApiProperty() name: string;
    @ApiProperty() display: string;
};
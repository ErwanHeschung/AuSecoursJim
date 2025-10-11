import { ApiProperty } from "@nestjs/swagger";

export class PreparedItemDto {
    @ApiProperty() _id: string;
    @ApiProperty() shortName: string;
    @ApiProperty() shouldStartAt: string;
    @ApiProperty() startedAt: string;
    @ApiProperty() finishedAt: string;
}

export class PreparationDto {
    @ApiProperty() _id: string;
    @ApiProperty() tableNumber: number;
    @ApiProperty() shouldBeReadyAt: string;
    @ApiProperty() completedAt: string;
    @ApiProperty() takenForServiceAt: string;
    @ApiProperty() preparedItems: PreparedItemDto[];
}
import { IsNotEmpty, IsPositive } from "class-validator";

export class UpdateNumberOfPersonsDto {
  @IsNotEmpty()
  @IsPositive()
  numberOfPersons: number;
}
import { IsNotEmpty, IsString, IsPositive, IsNumber, Min } from "class-validator";
import { MenuItem } from "../schemas/menu-item.schema";

export class GroupDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  groupId: number;

  @IsNotEmpty()
  @IsPositive()
  numberOfPersons: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  joinedPersons: number;

  menuItems: MenuItem[];
}
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

  status: StatusDTO;

  pricePerMenu: number;
}

export enum StatusDTO {
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}
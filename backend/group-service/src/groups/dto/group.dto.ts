import { IsNotEmpty, IsString, IsPositive } from "class-validator";
import { MenuItem } from "../schemas/menu-item.schema";

export class GroupDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  groupId: number;

  @IsNotEmpty()
  @IsPositive()
  members: number;

  menuItems: MenuItem[];
}
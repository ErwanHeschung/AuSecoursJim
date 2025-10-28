import { IsNotEmpty, IsString, IsPositive } from "class-validator";
import { Group } from "../schemas/group.schema";

export class GroupDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  groupId: number;

  @IsNotEmpty()
  @IsPositive()
  members: number;

  static GroupDtoFactory(group: Group): GroupDto {
    return group; // Update this function if Group != GroupDto
  }

}
import { IsNumberString } from 'class-validator';

export class GetGroupParams {
  @IsNumberString()
  groupId: number;
}

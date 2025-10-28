import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

export class GroupIdNotFoundException extends ErrorDto {
  constructor(groupId: number) {
    super(HttpStatus.NOT_FOUND, 'Group not found', `"${groupId}" is not a valid group id`);
  }
}

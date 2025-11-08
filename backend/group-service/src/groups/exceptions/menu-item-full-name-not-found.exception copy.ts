import { HttpStatus } from '@nestjs/common';

import { ErrorDto } from '../../shared/dto/error.dto';

export class MenuItemFullNameNotFoundException extends ErrorDto {
  constructor(fullName: string) {
    super(HttpStatus.NOT_FOUND, 'Menu item not found', `"${fullName}" is not a valid name`);
  }
}

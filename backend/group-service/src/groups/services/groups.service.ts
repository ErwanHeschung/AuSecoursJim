import { Injectable } from '@nestjs/common';

@Injectable()
export class GroupsService {
  constructor() {}

  async test(): Promise<boolean> {
    return false;
  }

}

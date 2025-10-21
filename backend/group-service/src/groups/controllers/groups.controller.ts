import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { GroupsService } from '../services/groups.service';


@ApiTags('groups')
@Controller('/groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Get()
  async test(): Promise<boolean> {
    return this.groupsService.test();
  }

}

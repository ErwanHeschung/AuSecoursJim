import { Module } from '@nestjs/common';

import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';

@Module({
  imports: [],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}

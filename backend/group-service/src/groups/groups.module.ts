import { Module } from '@nestjs/common';

import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';
import { Group, GroupSchema } from './schemas/group.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule {}

import { Module } from '@nestjs/common';

import { GroupsController } from './controllers/groups.controller';
import { GroupsService } from './services/groups.service';
import { Group, GroupSchema } from './schemas/group.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuProxyService } from './services/menu-proxy.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Group.name, schema: GroupSchema }]),
    HttpModule,
  ],
  controllers: [GroupsController],
  providers: [GroupsService, MenuProxyService],
})
export class GroupsModule {}

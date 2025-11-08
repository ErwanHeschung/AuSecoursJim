import { Injectable } from '@nestjs/common';
import { Group, GroupDocument } from '../schemas/group.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GroupIdNotFoundException } from '../exceptions/group-id-not-found.exception';
import { GroupDto } from '../dto/group.dto';
import { MenuProxyService } from './menu-proxy.service';
import { MenuItem } from '../schemas/menu-item.schema';

@Injectable()
export class GroupsService {

  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
    private readonly menuProxyService: MenuProxyService,
  ) {}


  private async completeGroup(group: Group): Promise<GroupDto> {
    const completedGroup = new GroupDto();

    completedGroup._id = group._id;
    completedGroup.groupId = group.groupId;
    completedGroup.members = group.members;

    completedGroup.menuItems = [];
    for (let menuItemFullName of group.menuItemFullNames) {
      try { completedGroup.menuItems.push(await this.menuProxyService.getMenuItem(menuItemFullName)); }
      catch(exception) {}
    }

    return completedGroup;
  }


  async findAll(): Promise<GroupDto[]> {
    const groups: Group[] = await this.groupModel.find().lean();
    return await Promise.all(groups.map(group => this.completeGroup(group)));
  }


  async findByGroupId(groupId: number): Promise<GroupDto> {
    const group: Group = await this.groupModel.findOne({ groupId: groupId }).lean();

    if (group === null) {
      throw new GroupIdNotFoundException(groupId);
    }

    return await this.completeGroup(group);
  }

  async getGroupMenuItems(groupId: number): Promise<MenuItem[]> {
    return (await this.findByGroupId(groupId)).menuItems;
  }

}
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
    completedGroup.numberOfPersons = group.numberOfPersons;

    completedGroup.menuItems = [];
    for (let menuItemFullName of group.menuItemFullNames) {
      try {
        completedGroup.menuItems.push(
          await this.menuProxyService.getMenuItem(menuItemFullName),
        );
      } catch (exception) {}
    }

    return completedGroup;
  }

  async findAll(): Promise<GroupDto[]> {
    const groups: Group[] = await this.groupModel.find().lean();
    return await Promise.all(groups.map((group) => this.completeGroup(group)));
  }

  async findByGroupId(groupId: number): Promise<GroupDto> {
    const group: Group = await this.groupModel
      .findOne({ groupId: groupId })
      .lean();

    if (group === null) {
      throw new GroupIdNotFoundException(groupId);
    }

    return await this.completeGroup(group);
  }

  async getGroupMenuItems(groupId: number): Promise<MenuItem[]> {
    return (await this.findByGroupId(groupId)).menuItems;
  }

  async join(groupId: number, numberOfPersons: number): Promise<GroupDto> {
    const group = await this.groupModel.findOne({ groupId }).exec();
    if (!group) {
      throw new GroupIdNotFoundException(groupId);
    }

    const totalJoined =
      (Number(group.joinedPersons) || 0) + Number(numberOfPersons);
    if (totalJoined > group.numberOfPersons) {
      throw new Error(
        `Cannot join: exceeds the max number of persons (${group.numberOfPersons})`,
      );
    }

    group.joinedPersons = totalJoined;
    const updatedGroup = await group.save();

    return {
      _id: updatedGroup._id.toString(),
      groupId: updatedGroup.groupId,
      numberOfPersons: updatedGroup.numberOfPersons,
      menuItems:null,
      joinedPersons:updatedGroup.joinedPersons
    };
  }
}
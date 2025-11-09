import { Injectable } from '@nestjs/common';
import { Group, GroupDocument } from '../schemas/group.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GroupIdNotFoundException } from '../exceptions/group-id-not-found.exception';
import { GroupDto, StatusDTO } from '../dto/group.dto';
import { MenuProxyService } from './menu-proxy.service';
import { MenuItem } from '../schemas/menu-item.schema';
import { Table } from '../schemas/table.schema';

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
    completedGroup.status = group.status;

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

    if (group.status === StatusDTO.CLOSED) {
      throw new Error('Cannot join: group is closed');
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
      menuItems: null,
      joinedPersons: updatedGroup.joinedPersons,
      status: updatedGroup.status,
      pricePerMenu: updatedGroup.pricePerMenu,
    };
  }

  async closeGroup(groupId: number): Promise<GroupDto> {
    const group = await this.findByGroupId(groupId);

    const updatedGroup = await this.groupModel
      .findOneAndUpdate(
        { groupId },
        { $set: { status: StatusDTO.CLOSED } },
        { new: true, lean: true },
      )
      .exec();

    if (!updatedGroup) {
      throw new GroupIdNotFoundException(groupId);
    }
    return await this.completeGroup(updatedGroup);
  }

  async addOrderToGroup(groupId: number, orderId: string): Promise<GroupDto> {
    const group = await this.groupModel.findOne({ groupId }).exec();
    if (!group) {
      throw new GroupIdNotFoundException(groupId);
    }

    if (!group.orders) {
      group.orders = [];
    }

    group.orders.push(orderId);
    const updatedGroup = await group.save();

    return {
      _id: updatedGroup._id.toString(),
      groupId: updatedGroup.groupId,
      numberOfPersons: updatedGroup.numberOfPersons,
      joinedPersons: updatedGroup.joinedPersons,
      status: updatedGroup.status,
      menuItems: null,
      pricePerMenu: null,
    };
  }

  async getGroupOrders(groupId: number): Promise<string[]> {
    const group = await this.groupModel.findOne({ groupId }).exec();
    if (!group) {
      throw new GroupIdNotFoundException(groupId);
    }

    return group.orders || [];
  }

  async getTablesByGroupId(groupId: number): Promise<Table[]> {
    const group = await this.groupModel.findOne({ groupId }).exec();
    if (!group) {
      throw new GroupIdNotFoundException(groupId);
    }

    return group.tables || [];
  }

  async assignPeopleToTable(
    groupId: number,
    tableNumber: number,
    count: number,
  ): Promise<Table> {
    const group = await this.groupModel.findOne({ groupId }).exec();
    if (!group) {
      throw new GroupIdNotFoundException(groupId);
    }

    const table = group.tables.find((t) => t.tableNumber === tableNumber);
    if (!table) {
      throw new Error(`Table ${tableNumber} not found in group ${groupId}`);
    }

    if ((table.assignedCount || 0) + count > table.capacity) {
      throw new Error(
        `Cannot assign ${count} people: exceeds table capacity of ${table.capacity}`,
      );
    }

    table.assignedCount = (table.assignedCount || 0) + count;

    await group.save();

    return table;
  }
}
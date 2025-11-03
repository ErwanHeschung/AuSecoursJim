import { Injectable } from '@nestjs/common';
import { Group, GroupDocument } from '../schemas/group.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { GroupIdNotFoundException } from '../exceptions/group-id-not-found.exception';

@Injectable()
export class GroupsService {

  constructor(
    @InjectModel(Group.name) private groupModel: Model<GroupDocument>,
  ) { }


  async findAll(): Promise<Group[]> {
    const allGroups: Group[] = await this.groupModel.find().lean();
    return allGroups;
  }

  async findByGroupId(groupId: number): Promise<Group> {
    const foundItem = await this.groupModel.findOne({ groupId: groupId }).lean();

    if (foundItem === null) {
      throw new GroupIdNotFoundException(groupId);
    }

    return foundItem;
  }

  async setNumberOfPersons(groupId: number, numberOfPersons: number) {
    const group = await this.findByGroupId(groupId);

    const updatedGroup = await this.groupModel
      .findOneAndUpdate(
        { groupId },
        { $set: { numberOfPersons } },
        { new: true, lean: true }
      )
      .exec();

    if (!updatedGroup) {
      throw new GroupIdNotFoundException(groupId);
    }

    return updatedGroup;
  }




}
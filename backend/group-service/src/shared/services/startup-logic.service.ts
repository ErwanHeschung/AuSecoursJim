import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Group } from 'src/groups/schemas/group.schema';

export class StartupLogicService implements OnApplicationBootstrap {
  constructor(@InjectConnection() private connection: Connection) { }

  createGroup(groupId: number, numberOfPersons: number): Group {
    const group: Group = new Group();
    group.groupId = groupId;
    group.numberOfPersons = numberOfPersons;
    return group;
  }

  async addGroup(groupId: number, numberOfPersons: number) {
    const groupModel = this.connection.models['Group'];

    const alreadyExists = await groupModel.find({ groupId });
    if (alreadyExists.length > 0) {
      throw new Error('Group already exists.');
    }

    return groupModel.create(this.createGroup(groupId, numberOfPersons));
  }

  async onApplicationBootstrap() {
    try {
      for (let i = 0; i < 5; i++) {
        await this.addGroup(i, i);
      }
    }
    catch (e) { }
  }
}

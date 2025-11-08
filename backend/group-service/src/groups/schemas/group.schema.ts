import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { StatusDTO } from '../dto/group.dto';

export type GroupDocument = Group & Document;

@Schema({
  versionKey: false,
})
export class Group {
  @ApiProperty()
  _id: string;

  @ApiProperty()
  @Prop({ required: true })
  groupId: number;

  @ApiProperty()
  @Prop({ required: true })
  numberOfPersons: number;

  @ApiProperty()
  @Prop({ required: true })
  menuItemFullNames: string[];

  @ApiProperty({ description: 'Number of people who have joined the group', default: 0 })
  @Prop({ default: 0 })
  joinedPersons: number;

  @ApiProperty({ description: 'Status of the group' })
  @Prop({ required: true, default: StatusDTO.OPEN })
  status: StatusDTO;
}

export const GroupSchema = SchemaFactory.createForClass(Group);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

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
  members: number;

  @ApiProperty()
  @Prop({ required: true })
  menuItemFullNames: string[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
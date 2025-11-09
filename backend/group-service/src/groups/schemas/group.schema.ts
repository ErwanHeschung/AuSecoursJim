import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { StatusDTO } from '../dto/group.dto';
import { Table, TableSchema } from './table.schema';

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

  @ApiProperty({
    description: 'Number of people who have joined the group',
    default: 0,
  })
  @Prop({ default: 0 })
  joinedPersons: number;

  @ApiProperty({ description: 'Status of the group' })
  @Prop({ required: true, default: StatusDTO.OPEN })
  status: StatusDTO;

  @Prop({ type: [String], default: [] })
  orders: string[];

  @ApiProperty({ description: 'Price per menu for the group' })
  @Prop({ required: true })
  pricePerMenu: number;

  @ApiProperty({ type: [Table], description: 'List of tables in the group' })
  @Prop({ type: [TableSchema], default: [] })
  tables: Table[];
}

export const GroupSchema = SchemaFactory.createForClass(Group);
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';

@Schema()
export class Table {
  @ApiProperty()
  @Prop({ required: true })
  tableNumber: number;

  @ApiProperty()
  @Prop({ required: true })
  capacity: number;
  
  @ApiProperty({
    description: 'Number of users currently assigned to this table',
  })
  @Prop({ default: 0 })
  assignedCount: number;
}

export const TableSchema = SchemaFactory.createForClass(Table);

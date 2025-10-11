import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TableProxy } from 'src/modules/back-proxy/table.proxy';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  controllers: [OrderController],
  providers: [OrderService, TableProxy],
})
export class OrderModule {}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { OrderController } from './order.controller';
import { OrderService } from './order.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}

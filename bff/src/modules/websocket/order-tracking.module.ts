import { Module } from '@nestjs/common';
import { OrderTrackingGateway } from './order-tracking.gateway';
import { TableProxy } from '../back-proxy/table.proxy';
import { PreparationProxy } from '../back-proxy/preparation.proxy';
import { HttpModule } from '@nestjs/axios';

@Module({
    imports: [HttpModule],
    providers: [OrderTrackingGateway, TableProxy, PreparationProxy],
    exports: [OrderTrackingGateway],
})
export class OrderTrackingModule { }

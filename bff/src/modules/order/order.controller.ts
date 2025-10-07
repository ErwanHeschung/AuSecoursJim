import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
export class OrderController {

  constructor(private readonly orderService: OrderService) {}

  @Get()
  @ApiOkResponse({ schema: { type: 'object', properties: { orderId: { type: 'string' } } } })
  async prepareOrderOnFirstFreeOrderNumber(): Promise<{ orderId: string }> {
    return this.orderService.prepareOrderOnFirstFreeOrderNumber();
  }

}
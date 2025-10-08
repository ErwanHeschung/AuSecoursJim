import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { OrderService } from './order.service';
import { BasketDto } from 'src/common/dto/basket.dto';

@ApiTags('order')
@Controller('order')
export class OrderController {

  constructor(private readonly orderService: OrderService) {}

  @Post('prepare')
  @ApiOkResponse({ schema: { type: 'object', properties: { orderId: { type: 'string' } } } })
  async prepareOrderOnFirstFreeOrderNumber(@Body('basket') basket: BasketDto): Promise<{ orderId: string }> {
    return this.orderService.prepareOrderOnFirstFreeOrderNumber(basket);
  }

  @Post('finish')
  @ApiOkResponse()
  @ApiBody({ schema: { properties: { orderId: { type: 'string' } } } })
  async finishOrder(@Body('orderId') orderId: string): Promise<void> {
    return this.orderService.finishOrder(orderId);
  }

}
import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) {}

  @Post('pay')
  @ApiOkResponse({ schema: { type: 'boolean' } })
  @ApiBody({ schema: { properties: { amount: { type: 'number' } } } })
  async pay(@Body('amount') amount: number): Promise<boolean> {
    return this.paymentService.pay(amount);
  }

}
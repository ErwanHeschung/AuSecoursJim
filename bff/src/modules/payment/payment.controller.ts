import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PaymentService } from './payment.service';

@ApiTags('payment')
@Controller('payment')
export class PaymentController {

  constructor(private readonly paymentService: PaymentService) {}

  @Get()
  @ApiOkResponse({ schema: { type: 'boolean' } })
  pay(): Promise<boolean> {
    return this.paymentService.pay();
  }

}
import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class PaymentService {

  private readonly logger = new Logger(PaymentService.name);

  constructor() {}

  async pay(amount: number): Promise<boolean> {
    return true;
  }

}
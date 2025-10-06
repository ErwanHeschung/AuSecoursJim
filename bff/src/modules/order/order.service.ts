import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class OrderService {

  private readonly logger = new Logger(OrderService.name);
  private backendUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.backendUrl = this.config.get<string>('GATEWAY_URL_WITH_PORT') ?? '';
    this.backendUrl += '/order';
  }

  async prepareOrderOnFirstFreeOrderNumber(): Promise<{ orderId: string }> {
    return { orderId: "ORDER_ID" };
  }

}

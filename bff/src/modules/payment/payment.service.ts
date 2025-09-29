import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PaymentService {

  private readonly logger = new Logger(PaymentService.name);
  private backendUrl: string;

  constructor(
    private readonly http: HttpService,
    private readonly config: ConfigService,
  ) {
    this.backendUrl = this.config.get<string>('GATEWAY_URL_WITH_PORT') ?? '';
    this.backendUrl += '/payment';
  }


  async pay(): Promise<boolean> {
    // this.logger.log("payment");
    return true; // TODO: logic of payment
  }

}

import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { MenuService } from './menu.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  providers: [MenuService],
  exports: [MenuService],
})
export class MenuModule {}

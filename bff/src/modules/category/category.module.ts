import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MenuService } from '../menu/menu.service';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
  ],
  controllers: [CategoryController],
  providers: [CategoryService, MenuService],
})
export class CategoryModule {}

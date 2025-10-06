import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { MenuService } from 'src/modules/back-proxy/menu/menu.service';
import { IngredientService } from 'src/modules/data-provider/ingredient/ingredient.service';
import { IngredientModule } from 'src/modules/data-provider/ingredient/ingredient.module';
import { MenuModule } from 'src/modules/back-proxy/menu/menu.module';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    IngredientModule,
    MenuModule
  ],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}

// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { MenuModule } from './modules/back-proxy/menu/menu.module';
import { CategoryModule } from './modules/front-endpoint/category/category.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientModule } from './modules/data-provider/ingredient/ingredient.module';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), 
    HttpModule.register({}),
    MenuModule,
    CategoryModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DB_URL,
      autoLoadEntities: true,
      synchronize: true,
      namingStrategy: new SnakeNamingStrategy(),
    }),
    IngredientModule,
  ],
})
export class AppModule {}

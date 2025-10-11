import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('BFF')
    .setDescription('API documentation for the BFF')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  app.useGlobalInterceptors(new LoggingInterceptor());

  const dataSource = app.get(DataSource);

  const sql = fs.readFileSync(path.join(__dirname, '../db-init/init.sql'), 'utf-8');
  await dataSource.query(sql);

  await app.listen(process.env.PORT ?? 4100);
}
bootstrap();

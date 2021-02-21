import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/http-exception.filter';
import { ValidationPipe } from './core/pipes/validation.pipe';
import documentConfig from './core/config/document-config';
import { writeFileSync } from 'fs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());

  if (app.get(ConfigService).get('env') === 'local') {
    const document = SwaggerModule.createDocument(app, documentConfig());
    writeFileSync('./swagger.json', JSON.stringify(document));
    SwaggerModule.setup('api', app, document);
  }

  await app.listen(app.get(ConfigService).get('port'), '0.0.0.0');
}
bootstrap();

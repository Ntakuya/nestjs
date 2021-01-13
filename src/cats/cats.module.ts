import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CatsService } from './cats.service';
import { CatsController } from './cats.controller';
import { LoggerMiddleware } from './middlewares/logger.middleware';
import { ValidationPipe } from '../core/pipes/validation.pipe';

@Module({
  controllers: [CatsController],
  providers: [CatsService, ValidationPipe],
})
export class CatsModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}

import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ValidationPipe } from './core/pipes/validation.pipe';
import { ControllerForGuardModule } from './controller-for-guard/controller-for-guard.module';

@Module({
  imports: [CatsModule, ControllerForGuardModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}

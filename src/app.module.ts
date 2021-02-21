import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsModule } from './cats/cats.module';
import { ValidationPipe } from './core/pipes/validation.pipe';
import { ControllerForGuardModule } from './controller-for-guard/controller-for-guard.module';
import { LoggintInterceptor } from './core/interceptor/loggint.interceptor';
import { ConfigModule } from '@nestjs/config';
import configuration from './core/config/configuration';

@Module({
  imports: [
    CatsModule,
    ControllerForGuardModule,
    ConfigModule.forRoot({
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggintInterceptor,
    },
  ],
})
export class AppModule {}

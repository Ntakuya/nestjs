import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './core/pipes/validation.pipe';
import { LoggintInterceptor } from './core/interceptor/loggint.interceptor';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './core/config/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './todo/todo.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        return {
          ...configService.get('database'),
        };
      },
    }),
    TodoModule,
  ],
  providers: [
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

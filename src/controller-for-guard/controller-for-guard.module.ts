import { Module } from '@nestjs/common';
import { ControllerForGuardService } from './controller-for-guard.service';
import { ControllerForGuardController } from './controller-for-guard.controller';

@Module({
  controllers: [ControllerForGuardController],
  providers: [ControllerForGuardService],
})
export class ControllerForGuardModule {}

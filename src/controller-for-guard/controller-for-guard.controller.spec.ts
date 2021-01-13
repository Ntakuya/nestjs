import { Test, TestingModule } from '@nestjs/testing';
import { ControllerForGuardController } from './controller-for-guard.controller';
import { ControllerForGuardService } from './controller-for-guard.service';

describe('ControllerForGuardController', () => {
  let controller: ControllerForGuardController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ControllerForGuardController],
      providers: [ControllerForGuardService],
    }).compile();

    controller = module.get<ControllerForGuardController>(
      ControllerForGuardController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

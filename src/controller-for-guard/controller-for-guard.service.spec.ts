import { Test, TestingModule } from '@nestjs/testing';
import { ControllerForGuardService } from './controller-for-guard.service';

describe('ControllerForGuardService', () => {
  let service: ControllerForGuardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ControllerForGuardService],
    }).compile();

    service = module.get<ControllerForGuardService>(ControllerForGuardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

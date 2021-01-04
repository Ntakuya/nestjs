import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';

describe('CatsController', () => {
  let controller: CatsController;
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('GET /cats', () => {
    it('response string', async () => {
      try {
        const res = await controller.findAll();
        expect(res).toBeInstanceOf(Array);
      } catch (error) {
        expect(error.status).toBe(HttpStatus.FORBIDDEN);
      }
    });
  });
});

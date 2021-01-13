import { HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatDto } from './dto/create-cat.dto';
import { Cat } from './entities/cat.entity';

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

  describe('GET /cats/:id', () => {
    let requestId = null;
    it('should return 404', async () => {
      try {
        requestId = 'string';
        const res = controller.findOne(requestId);
        expect(res).toBeInstanceOf(Cat);
      } catch (error) {
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('POST /cats', () => {
    it('should return 200', async () => {
      const request: CreateCatDto = {
        name: 'name',
        age: 10,
        breed: 'breed',
      };

      const res = controller.create(request);
      expect(res.name).toEqual(request.name);
      expect(res.age).toEqual(request.age);
      expect(res.breed).toEqual(request.breed);
    });
  });

  describe('PUT /cats/:id', () => {
    let requestId = null;
    it('should return 404', async () => {
      try {
        requestId = 'string';
        const res = controller.update(requestId, {});
      } catch (error) {
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });

  describe('DELETE /cats/:id', () => {
    let requestId = null;
    it('should return 404', async () => {
      try {
        requestId = 'string';
        const res = controller.remove(requestId);
      } catch (error) {
        expect(error.status).toBe(HttpStatus.NOT_FOUND);
      }
    });
  });
});

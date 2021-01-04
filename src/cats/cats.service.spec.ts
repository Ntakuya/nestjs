import { Test, TestingModule } from '@nestjs/testing';
import { CatsService } from './cats.service';

describe('CatsService', () => {
  let service: CatsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatsService],
    }).compile();

    service = module.get<CatsService>(CatsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return instanceof array', () => {
      expect(service.findAll()).toBeInstanceOf(Array);
    });
  });

  describe('findOne', () => {
    it('should return cat have id === expected', () => {
      const id = 1;
      const response = service.findOne(id);
      expect(response.error.message).toBe('ENTITY_NOT_FOUND');
      expect(response.cat).toBeNull();
    });
  });
});

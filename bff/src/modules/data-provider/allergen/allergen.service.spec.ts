import { Test, TestingModule } from '@nestjs/testing';
import { AllergenService } from './allergen.service';

describe('AllergenService', () => {
  let service: AllergenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AllergenService],
    }).compile();

    service = module.get<AllergenService>(AllergenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

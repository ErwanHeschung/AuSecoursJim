import { Test, TestingModule } from '@nestjs/testing';
import { AllergenController } from './allergen.controller';
import { AllergenService } from './allergen.service';

describe('AllergenController', () => {
  let controller: AllergenController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AllergenController],
      providers: [AllergenService],
    }).compile();

    controller = module.get<AllergenController>(AllergenController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

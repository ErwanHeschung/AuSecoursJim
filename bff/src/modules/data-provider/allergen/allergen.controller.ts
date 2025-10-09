import { Controller, Get } from '@nestjs/common';
import { AllergenService } from './allergen.service';
import { AllergenDTO } from 'src/common/dto/allergen.dto';

@Controller('allergen')
export class AllergenController {
  constructor(private readonly allergenService: AllergenService) { }
  
  @Get()
  async findAll(): Promise<AllergenDTO[]> {
    const allergens = await this.allergenService.findAll();
    return allergens.map(a => ({ name: a.name, display: a.display }));
  }
}

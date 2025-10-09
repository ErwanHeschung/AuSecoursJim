import { Module } from '@nestjs/common';
import { AllergenService } from './allergen.service';
import { AllergenController } from './allergen.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Allergen } from 'src/common/model/allergen';
import { ItemAllergen } from 'src/common/model/ItemAllergen';

@Module({
  imports: [
    TypeOrmModule.forFeature([Allergen, ItemAllergen]),
  ],
  controllers: [AllergenController],
  providers: [AllergenService],
  exports:[AllergenService]
})
export class AllergenModule {}

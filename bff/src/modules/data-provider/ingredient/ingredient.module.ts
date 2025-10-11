import { Module } from '@nestjs/common';
import { IngredientService } from './ingredient.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ingredient } from 'src/common/model/ingredient';
import { ItemIngredient } from 'src/common/model/ItemIngredient';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ingredient, ItemIngredient]),
  ],
  providers: [IngredientService],
  exports: [IngredientService]
})
export class IngredientModule {}

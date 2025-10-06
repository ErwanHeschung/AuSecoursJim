import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ItemIngredient } from 'src/common/model/ItemIngredient';
import { IngredientDto } from 'src/common/dto/ingredient.dto';

@Injectable()
export class IngredientService {
    constructor(
        @InjectRepository(ItemIngredient)
        private itemIngredientRepo: Repository<ItemIngredient>,
    ) { }
    
    async getIngredientsForItem(itemId: string): Promise<IngredientDto[]> {
        const itemIngredients = await this.itemIngredientRepo.find({
            where: { itemId },
            relations: ['ingredient'],
        });

        return itemIngredients.map(ii => ({
            name: ii.ingredient.name,
            quantity: ii.quantity,
        }));
    }
}

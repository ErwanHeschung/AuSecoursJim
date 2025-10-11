import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AllergenDTO } from 'src/common/dto/allergen.dto';
import { Allergen } from 'src/common/model/allergen';
import { ItemAllergen } from 'src/common/model/ItemAllergen';
import { Repository } from 'typeorm';

@Injectable()
export class AllergenService {
    constructor(
        @InjectRepository(Allergen)
        private readonly allergenRepository: Repository<Allergen>,
        @InjectRepository(ItemAllergen)
        private readonly itemAllergenRepository: Repository<ItemAllergen>,
    ) { }

    async findAll(): Promise<Allergen[]> {
        return this.allergenRepository.find();
    }

    async getItemAllergensForItem(itemName: string): Promise<AllergenDTO[]> {
        const itemAllergens = await this.itemAllergenRepository.find({
            where: { itemName },
            relations: ['allergen'],
        });

        return itemAllergens.map(ia => ({
            name: ia.allergen.name,
            display: ia.allergen.display,
        }));
    }
}

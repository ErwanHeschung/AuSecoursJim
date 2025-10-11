import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Allergen } from "./allergen";

@Entity()
@Unique('UQ_item_allergen', ['itemName', 'allergen'])
export class ItemAllergen {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ name: 'item_name' })
    itemName: string;

    @ManyToOne(() => Allergen)
    @JoinColumn({ name: 'allergen_id' })
    allergen: Allergen;
}

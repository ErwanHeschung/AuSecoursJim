import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Allergen } from "./allergen";

@Entity()
export class ItemAllergen {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ name: 'item_name' })
    itemName: string;

    @ManyToOne(() => Allergen)
    @JoinColumn({ name: 'allergen_id' })
    ingredient: Allergen;
}

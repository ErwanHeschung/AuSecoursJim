import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Ingredient } from "./ingredient";

@Entity()
@Unique('UQ_item_ingredient', ['itemName', 'ingredient'])
export class ItemIngredient {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ name: 'item_name' })
    itemName: string;

    @ManyToOne(() => Ingredient)
    @JoinColumn({ name: 'ingredient_id' })
    ingredient: Ingredient;

    @Column('int', { default: 1 })
    quantity: number;
}

import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Ingredient } from "./ingredient";

@Entity()
export class ItemIngredient {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column()
    itemId: string;

    @ManyToOne(() => Ingredient)
    @JoinColumn({ name: 'ingredient_id' })
    ingredient: Ingredient;

    @Column('int', { default: 1 })
    quantity: number;
}

import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Ingredient {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column()
    name: string;
}

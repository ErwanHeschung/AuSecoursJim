import { Column, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['name'])
export class Allergen {
    @PrimaryGeneratedColumn('uuid')
    _id: string;

    @Column({ unique: true })
    name: string;

    @Column()
    display: string;
}
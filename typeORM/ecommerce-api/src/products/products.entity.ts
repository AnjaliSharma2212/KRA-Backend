import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    productName:string

    @Column()
    price: number

    @Column({default: 0})
    stock: number
}
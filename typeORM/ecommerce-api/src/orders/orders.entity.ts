import { User } from "../users/users.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('orders')
export class Order{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @ManyToOne(()=> User, user=> user.orders)
    user:User
}
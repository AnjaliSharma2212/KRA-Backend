import { Order } from "../orders/orders.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("users")
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name:string

    @Column({unique:true})
    email:string

    @OneToMany(()=> Order , order=> order.user)
     orders: Order[]
}
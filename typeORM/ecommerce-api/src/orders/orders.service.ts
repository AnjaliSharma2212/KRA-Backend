import { Injectable } from '@nestjs/common';
import { User } from 'src/users/users.entity';
import { DataSource, Repository } from 'typeorm';
import { Order } from './orders.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {
    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private dataSource: DataSource){}

    async createOrder(userId:number, quantity:number){
        await this.dataSource.transaction(async (manager)=>{
            const user = await manager.findOne(User, {
                where:{id:userId}
            })

            if (!user) {
                throw new Error('User not found');
            }

            const order = manager.create(Order,{
                quantity,
                user
            });
            const savedOrder=await manager.save(order)
            return savedOrder
        })
    }
    findAll(){
        return this.orderRepository.find({
            relations:['user']
        })
    }
async getOrders(page:number, limit:number){
    const qb = this.orderRepository
    .createQueryBuilder('order')
    .leftJoinAndSelect('order.user','user')
    .skip((page-1)* limit)
    .take(limit)

    const [data, total]= await qb.getManyAndCount()
    return{
        data,
        total,
        page,
        limit
    }
}
}

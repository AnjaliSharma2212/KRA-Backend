import { Controller, Post, Body, Get, Query } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
    constructor(private orderService: OrdersService) {}
    @Post()
    createOrder(@Body() body){
        return this.orderService.createOrder(
              body.userId,
              body.quantity
        )   
    }

    @Get()
    getOrders(
        @Query('page') page:number,
        @Query('limit') limit: number
    ){
        return this.orderService.getOrders(page,limit)
    }
}

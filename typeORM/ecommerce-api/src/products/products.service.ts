import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
       private readonly productRepo: Repository<Product>, 
    ){}
    async getProducts(page:number, limit:number){
        return this.productRepo
        .createQueryBuilder('product')
        .where('product.stock > :stock', {stock:0})
        .skip((page-1)*limit)
        .take(limit)
        .getMany()
    }
}

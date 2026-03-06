import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './products.entity';
import { BaseQueryDtoWithSort } from 'src/common/dto/base-query-with-sort.dto';

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
    async findAll(query: BaseQueryDtoWithSort){
        const {page = 1, perPage = 10, sortBy = 'id', search, sortOrder = 'ASC'} = query
        const qb= this.productRepo.createQueryBuilder('product') 

        if(search) {
            qb.where('product.name ILIKE :search',{
                search:`%${search}%`
            })
        }
        qb.orderBy(`product.${sortBy}`, sortOrder)
        qb.skip((page-1) * perPage)
        qb.take(perPage)
      const [data, total]= await qb.getManyAndCount()
      return{
        data,
        meta:{
            total,
            page,
            perPage,
            totalPages: Math.ceil(total/perPage)
        }
      }
    }
}

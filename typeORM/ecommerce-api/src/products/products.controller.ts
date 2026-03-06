import { Controller, Get, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { BaseQueryDtoWithSort } from 'src/common/dto/base-query-with-sort.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getProducts(@Query() query: BaseQueryDtoWithSort) {
    return this.productService.findAll(query);
  }
}
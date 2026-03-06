import { Controller, Get, Query } from '@nestjs/common';
import { BaseQueryDtoWithSort } from 'src/common/dto/base-query-with-sort.dto';

@Controller('products')
export class ProductsController {
    @Get()
async getProducts(@Query() query: BaseQueryDtoWithSort) {
  return this.productService.findAll(query);
}
}

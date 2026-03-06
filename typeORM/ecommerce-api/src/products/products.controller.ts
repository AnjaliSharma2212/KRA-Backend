import { Controller, Get, Query } from '@nestjs/common';
<<<<<<< HEAD
import { ProductsService } from './products.service';
=======
>>>>>>> e9aea6145f8ab4f8d02a26f227f4e50150cc5e49
import { BaseQueryDtoWithSort } from 'src/common/dto/base-query-with-sort.dto';

@Controller('products')
export class ProductsController {
<<<<<<< HEAD
  constructor(private readonly productService: ProductsService) {}

  @Get()
  async getProducts(@Query() query: BaseQueryDtoWithSort) {
    return this.productService.findAll(query);
  }
}
=======
    @Get()
async getProducts(@Query() query: BaseQueryDtoWithSort) {
  return this.productService.findAll(query);
}
}
>>>>>>> e9aea6145f8ab4f8d02a26f227f4e50150cc5e49

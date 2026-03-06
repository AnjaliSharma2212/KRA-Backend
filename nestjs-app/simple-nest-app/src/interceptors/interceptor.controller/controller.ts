import { UseInterceptors, Controller, Get } from '@nestjs/common';
import { ResponseInterceptor } from '../response-interceptor';


@Controller('sample')
@UseInterceptors(ResponseInterceptor)
export class SampleController {
  @Get()
  getData() {
    return { message: 'Hello World' }; // transformed by interceptor
  }
}
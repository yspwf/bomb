import { Get, Post, Controller } from '../../../library';
import { AfterSalesService } from  './afterSalesService';

@Controller('salesOrder')
export class AfterSalesController{
  constructor(private readonly afterSalesService: AfterSalesService){}

  @Get('/order')
  async firstFunc(){
    return this.afterSalesService.firstFunc();
    //ctx.body = await this.orderService.firstFunc();
  }

}
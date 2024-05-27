import { Get, Post, Controller } from '../../library';
import { OrderService } from  './orderService';

// @Middleware(async (ctx:any, next:any)=>{
//   console.log('Middleware2');
//   await next();
// })
@Controller('order')
export class OrderController{
  constructor(private readonly orderService: OrderService){}

  @Get('/order')
  async firstFunc(){
    return this.orderService.firstFunc();
    //ctx.body = await this.orderService.firstFunc();
  }

}
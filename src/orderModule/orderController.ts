import { Get, Post, Controller, Middleware } from '../../library';
import { OrderService } from  './orderService';

@Middleware((ctx:any, next:any)=>{
  console.log('Middleware2');
  next();
})
@Controller('order')
export class OrderController{
  constructor(private readonly orderService: OrderService){}

  @Get('/order')
  async firstFunc(){
    return this.orderService.firstFunc();
    //ctx.body = await this.orderService.firstFunc();
  }

}
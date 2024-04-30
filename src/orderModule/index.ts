import { Bootstrap } from '../../library';
import { OrderController } from './orderController';
import { OrderService } from './orderService';
import { SalesOrderModule } from './afterSales';

@Bootstrap({
  Controllers:[OrderController], 
  Providers:[OrderService], 
  Modules:[SalesOrderModule]
})
export class OrderModule{}
import { Bootstrap } from '../../../library';
import { AfterSalesController } from './afterSalesController';
import { AfterSalesService } from './afterSalesService';


@Bootstrap({
  Controllers:[AfterSalesController], 
  Providers: [AfterSalesService]
})
export class SalesOrderModule{}
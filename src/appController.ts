import { Get, Post, Controller, Query, Params, Body, before, after, Context } from '../library';

import { AppService } from './appService';
// import { HomeService } from './homeService';
// import { UserService } from './User/userService';

// import { getManager } from 'typeorm';
import { Article } from './entity/article';
import { createConnection, Connection, getManager } from 'typeorm'


let start:number = 0;
// @Middleware(async (ctx:Context, next:() => Promise<void>)=>{
//   console.log('Middleware1');
//   const start = Date.now();
//   await next();
//   const ms = Date.now() - start;
//   console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
//   // await next();
// })
@Controller('/app')
export class AppController{

  constructor(
    private readonly appService:AppService
  ){
    //console.log(appService.firstFunc());
    //this.test = appService;
  }

  @Post()
  test(@Body() body:any){
    console.log('body', body);
    return 'ewww';
  }

  @before(()=>{
    start = Date.now();
    console.log('before inner Middleware2');
  })
  @after((ctx:Context)=>{
    console.log('Middleware3');
    console.log('after out Middleware2');
    const ms = Date.now() - start;
    console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
  })
  @Get('test2')
  async test2(@Query() params: any){
    console.log('Query', params.a);
    return await this.appService.firstFunc();
  }

  @Get('/test1/:id')
  test1(@Params() params:any){
    console.log("params", params);
    return 'test1';
  }

  @Get('/detail/:id')
  async firstFunc(@Params('id') id:string, @Params('status') status:string){
    console.log("params", id, status);
    return await this.appService.firstFunc();
  }

  // @Post('/test')
  // postFunc(){
  //   //return 'post firstFunc';
  //   return [this.userService.firstFunc()];
  // }

}
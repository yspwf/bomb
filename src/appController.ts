import { Get, Post, Controller, Query, Params, Body, Middleware, Context } from '../library';

import { AppService } from './appService';
// import { HomeService } from './homeService';
// import { UserService } from './User/userService';

// import { getManager } from 'typeorm';
import { Article } from './entity/article';
import { createConnection, Connection, getManager } from 'typeorm'

@Middleware(async (ctx:Context, next:() => Promise<void>)=>{
  console.log('Middleware1');
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  console.log(`${ctx.method} ${ctx.url} ${ctx.status} - ${ms}ms`);
  // await next();
})
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

  @Middleware(async (ctx:any, next:any)=>{
    console.log('Middleware3');
    await next();
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
   
    // const res = [
    //   {
    //     id: 1,
    //     title: 'MySQL存储文章',
    //     body: 'MySQL是一个流行的关系型数据库管理系统，用于存储、管理和访问数据。在创建网站或应用程序时，MySQL通常被用作存储文章、博客、新闻等内容的地方。',
    //     author: 'John Doe',
    //     created_at: '2024-01-13T23:09:33.000Z'
    //   }
    // ];  
    // const res = await this.appService.firstFunc();
    // console.log("firstFunc res", res);
    // const articleRepository = getManager().getRepository(Article);
    // const articles = await articleRepository.find();
    // console.log("firstFunc res", articles);
    // // return res;
    // ctx.body = JSON.stringify(articles);
  }

  // @Post('/test')
  // postFunc(){
  //   //return 'post firstFunc';
  //   return [this.userService.firstFunc()];
  // }

}
import { Bootstrap } from '../library';

import { OrderModule } from './orderModule';
const Modules:any[] = [OrderModule];

import { AppController } from './appController';
const Controllers = [AppController];

import { AppService } from './appService';
import { UserService } from './User/userService';
import { HomeService } from './homeService';

const Providers = [AppService, UserService, HomeService];


import { Article } from './entity/article';
import { User } from './entity/user';
import { createConnection, Connection, getManager } from 'typeorm'

@Bootstrap({Controllers, Providers, Modules})
export class Main{

  
  async factory(app:any){

    // app.use(async (ctx:any, next:any) => {
    //   console.log('2323')
    //   await next();
    // });
 
    try{
      const connection: Connection = await createConnection({
        type: 'mysql', // 数据库类型
        host: 'localhost', // 数据库地址
        port: 3306, // 数据库端口号
        username: "root",
        password: "123456",
        database: "blog",
        entities: [Article, User], // 引入实体
        // synchronize: true,
      });
      // console.log(connection)
      console.log('数据库连接成功')
    }catch(err) {
      console.log('应用启动失败')
      console.log(err)
    }
   
  }

}
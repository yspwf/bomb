import { MODULE_METADATA_KEY, INJECTABLE_METADATA_KEY, MODULE_CONTROLLER_METADATA_KEY, MODULE_PROVIDER_METADATA_KEY, MODULE_MODULE_METADATA_KEY, PARAMETER_METADATA, AFTER_MIDDLEWARE_METADATA, BEFORE_MIDDLEWARE_METADATA } from './contants';
import { router, IMiddleware } from './router';

import { Factory, Register } from './beanFactory';
import { methodType, bootstrapMetadata } from './type';
import { Context, Next } from 'koa';



const controllerLoader = (controllers: Array<new (...args: any[]) => any>) => {
  controllers.forEach((controllerItem:new (...args: any[]) => any)=> {

    const beforeMidlleCrl = Reflect.getMetadata(BEFORE_MIDDLEWARE_METADATA, controllerItem);
    // console.log("controllPathValue", controllerItem, midlle);
    

    const constructorParameters = Reflect.getMetadata('design:paramtypes', controllerItem) || [];
    //console.log(constructorParameters);
    const constructorParameterObjs = constructorParameters.map((item: new (...args:any[]) => any) => {
      const itemObj = Factory(item);
      return new itemObj();
    });
    const app = new controllerItem(...constructorParameterObjs);
    
    const controllerFuncs = Object.getOwnPropertyNames(controllerItem.prototype).filter( prototype => prototype !== 'constructor');

    let combinePath = '';
    const controllPath:string[] = [];
    const controllPathValue = Reflect.getMetadata('PATH_METADATA', controllerItem).split('/').filter((item:string) => item !== '');
    controllPath.push(...controllPathValue);
    const realControllPath = controllPath.join('/');

    controllerFuncs.forEach((func:string | symbol) => {
      const beforeMidlleFunc = Reflect.getMetadata(BEFORE_MIDDLEWARE_METADATA, controllerItem.prototype[func]);
      //console.log("beforeMidlle", beforeMidlleFunc);
      const afterMidlleFunc = Reflect.getMetadata(AFTER_MIDDLEWARE_METADATA, controllerItem.prototype[func]);
      //console.log("beforeMidlle", afterMidlleFunc);

      const method:methodType = Reflect.getMetadata('METHOD_METADATA', controllerItem.prototype[func]);
     
      const methodPath:Array<string> = [];
      const methodPathValue = Reflect.getMetadata('PATH_METADATA', controllerItem.prototype[func]).split('/').filter((item:string) => item !== '');
      methodPath.push(...methodPathValue);
      const path = methodPath.join('/');

      if(path){
        combinePath = `/${realControllPath}/${path}`;
      }else{
        combinePath = `/${realControllPath}`;
      }
      console.log("combinePath", `${method} ${combinePath}`);

      // const execFunc:Array<IMiddleware> = [];
      // const beforeFunc:Array<Function> = [];

      // if(midlle){
      //   beforeFunc.push(midlle);
      // }

      // if(funcMidlle){
      //   beforeFunc.push(funcMidlle);
      // }
      
      // console.log(beforeFunc);

      const beforeExecuteFunc = async (ctx: Context, next: Next) => {
        beforeMidlleFunc && beforeMidlleFunc.map((func:any) =>  func());
        await next();
      }

      const afterExecuteFunc = async (ctx: Context, next: Next) => {
        await next();
        afterMidlleFunc && afterMidlleFunc.map((func:any) =>  func(ctx));
      }


      const realFunc = async (ctx:any) => {
        //console.log(ctx.request.body);
        const paramsMetadata:any[] = Reflect.getMetadata(PARAMETER_METADATA, controllerItem.prototype, func);
        //console.log(paramsMetadata);

        let args: Array<string | object | unknown> = []
        if(paramsMetadata){
          //const filterRes = paramsMetadata.filter(item => console.log(item));
            paramsMetadata.filter((param: any) =>
              param.method === func
            ).map((param:any) => {
              const {index, key} = param;
              switch (param.type) {
                  case "query":
                      args[index] = ctx.query[key] ?? ctx.query;
                      break;
                  case "params":
                      args[index] = ctx.params[key] ?? ctx.params;
                      break;
                  case "body":
                      args[index] = ctx.request.body[key] ?? ctx.request.body;
                      break
                  default:
                      throw "请求的参数不在类型定义中"
              }
            })
          }
        const res = await app[func](...args);
        ctx.body = res;
      }

      //execFunc.push(realFunc);

      switch(method){
        case 'get':
          router.get(combinePath, beforeExecuteFunc, afterExecuteFunc, realFunc);
          break;
        case 'post':
          router.post(combinePath, beforeExecuteFunc, afterExecuteFunc, realFunc);
          break;
        case 'put':
          router.put(combinePath, beforeExecuteFunc, afterExecuteFunc, realFunc);
          break;
        case 'delete':
          router.delete(combinePath, beforeExecuteFunc, afterExecuteFunc, realFunc);
          break;
        default:
          throw new Error('error api method');
          break;
      }
    });
  })
}


const providerLoader = (providers: Array<new (...args: any[]) => any>) => {
  providers.forEach((provider:new (...args: any[]) => any) => {
    Register(provider);
  })
}



const Bootstrap = (bootstrapValues:bootstrapMetadata) => {
  return (target: new (...args:any[]) => any) => {
    Reflect.defineMetadata(MODULE_METADATA_KEY, true, target);
    
    if(bootstrapValues.Controllers){
      Reflect.defineMetadata(MODULE_CONTROLLER_METADATA_KEY, bootstrapValues.Controllers, target);
    }
    if(bootstrapValues.Providers){
      Reflect.defineMetadata(MODULE_PROVIDER_METADATA_KEY, bootstrapValues.Providers, target);
    }
    if(bootstrapValues.Modules){
      Reflect.defineMetadata(MODULE_MODULE_METADATA_KEY, bootstrapValues.Modules, target);
    }
  }
}

export { Bootstrap, controllerLoader, providerLoader};

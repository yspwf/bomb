import { MODULE_METADATA_KEY, INJECTABLE_METADATA_KEY, MODULE_CONTROLLER_METADATA_KEY, MODULE_PROVIDER_METADATA_KEY, MODULE_MODULE_METADATA_KEY, PARAMETER_METADATA, MIDDLEWARE_METADATA } from './contants';
import { router } from './router';

import { Factory, Register } from './beanFactory';
import { server } from './http';
import { stringify } from 'querystring';


const controllerLoader = (controllers: any[]) => {
  controllers.forEach((controllerItem:any)=> {

    const midlle = Reflect.getMetadata(MIDDLEWARE_METADATA, controllerItem);
    console.log("controllPathValue", controllerItem, midlle);
    

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

    controllerFuncs.forEach( func => {
      
      const funcMidlle = Reflect.getMetadata(MIDDLEWARE_METADATA, controllerItem.prototype[func]);
      console.log("funcMidlle", funcMidlle);

      const method = Reflect.getMetadata('METHOD_METADATA', controllerItem.prototype[func]);
     
      const methodPath:string[] = [];
      const methodPathValue = Reflect.getMetadata('PATH_METADATA', controllerItem.prototype[func]).split('/').filter((item:string) => item !== '');
      methodPath.push(...methodPathValue);
      const path = methodPath.join('/');

      if(path){
        combinePath = `/${realControllPath}/${path}`;
      }else{
        combinePath = `/${realControllPath}`;
      }

      console.log("combinePath", `${method} ${combinePath}`);
      let args: any[] = []
      const execFunc = [];
      if(midlle){
        execFunc.push(midlle);
      }

      if(funcMidlle){
        execFunc.push(funcMidlle);
      }
      
      const realFunc = async (ctx:any) => {
        //console.log(ctx.request.body);
        const paramsMetadata:any[] = Reflect.getMetadata(PARAMETER_METADATA, controllerItem.prototype, func);
        //console.log(paramsMetadata);

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
        console.log(res);
        ctx.body = res;
      }

      execFunc.push(realFunc);
      console.log(execFunc);

      switch(method){
        case 'get':
          router.get(combinePath, ...execFunc);
          break;
        case 'post':
          router.post(combinePath, ...execFunc);
          break;
        // case 'put':
        //   router.put(combinePath, execFunc);
        //   break;
        // case 'delete':
        //   router.delete(combinePath, execFunc);
        //   break;
        default:
          throw new Error('error api method');
          break;
      }
    });
  })
}


const providerLoader = (providers: any[]) => {
  providers.forEach((provider:any) => {
    Register(provider);
  })
}



const Bootstrap = (bootstrapValues:any) => {
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

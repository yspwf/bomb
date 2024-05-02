import { MIDDLEWARE_METADATA } from './contants';

const Middleware = (func:Function) => {
  return (target: Object | {[key: string]: any}, key?: string, descriptor?: PropertyDescriptor | undefined) => {
    console.log(typeof target)
    if(typeof target === 'function') {
      Reflect.defineMetadata(MIDDLEWARE_METADATA, func, target);
    }

    if(typeof target === 'object'){
      Reflect.defineMetadata(MIDDLEWARE_METADATA, func, descriptor?.value);
    }
    
  }
}

export {Middleware};
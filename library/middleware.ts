import { BEFORE_MIDDLEWARE_METADATA, AFTER_MIDDLEWARE_METADATA } from './contants';

const before = (func:Function) => {
  return (target: Object | {[key: string]: any}, key?: string, descriptor?: PropertyDescriptor | undefined) => {
    
    if(descriptor && typeof target === 'object'){
      const previousMetaData = Reflect.getMetadata(BEFORE_MIDDLEWARE_METADATA, descriptor?.value) || [];
      const newParameterMetadata = [func, ...previousMetaData];

      Reflect.defineMetadata(BEFORE_MIDDLEWARE_METADATA, newParameterMetadata, descriptor?.value);
    }

    if(typeof target === 'function') {
      Reflect.defineMetadata(BEFORE_MIDDLEWARE_METADATA, func, target);
    } 
  }
}


const after = (func:Function) => {
  return (target: Object | {[key: string]: any}, key?: string, descriptor?: PropertyDescriptor | undefined) => {
    
    if(descriptor && typeof target === 'object'){
      const previousMetaData = Reflect.getMetadata(AFTER_MIDDLEWARE_METADATA, descriptor?.value) || [];
      const newParameterMetadata = [func, ...previousMetaData];

      Reflect.defineMetadata(AFTER_MIDDLEWARE_METADATA, newParameterMetadata, descriptor?.value);
    }

    if(typeof target === 'function') {
      Reflect.defineMetadata(AFTER_MIDDLEWARE_METADATA, func, target);
    } 
  }
}

export {before, after};
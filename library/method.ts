import { METHOD_METADATA, PATH_METADATA } from './contants';
const createDecorator = (method:string)=>{
  return (path:string = '') => {
    return (target: {[key: string]: any}, key: string, descriptor: PropertyDescriptor) => {
      console.log("method", typeof target);
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    }
  }
}

const Get = createDecorator('get');
const Post = createDecorator('post');
const Delete = createDecorator('delete');
const Put = createDecorator('put');
const Batch = createDecorator('batch');
export {Get, Post, Delete, Put, Batch};

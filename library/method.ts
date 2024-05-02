import { METHOD_METADATA, PATH_METADATA } from './contants';
import { methodType } from './type';
const createDecorator = (method:methodType)=>{
  return (path:string = '') => {
    return (target: {[key: string]: any}, key: string, descriptor: PropertyDescriptor) => {
      //console.log("method", typeof target);
      Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
      Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
    }
  }
}

const Get = createDecorator(methodType.Get);
const Post = createDecorator(methodType.Post);
const Delete = createDecorator(methodType.Delete);
const Put = createDecorator(methodType.Put);
const Batch = createDecorator(methodType.Batch);
export {Get, Post, Delete, Put, Batch};

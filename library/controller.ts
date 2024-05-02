import { PATH_METADATA } from './contants';

const Controller = (path: string = '') => {
  return (target: new (...args:any[]) => any) => {
    //console.log("Controller", typeof target);
    Reflect.defineMetadata(PATH_METADATA, path, target);
  }
}

export {Controller};
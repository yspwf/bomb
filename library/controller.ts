import { PATH_METADATA } from './contants';

const Controller = (path: string = '') => {
  return (target: new (...args:any[]) => any) => {
    Reflect.defineMetadata(PATH_METADATA, path, target);
  }
}

export {Controller};
import { PARAMETER_METADATA } from './contants';

const createParamDecorator = (type:string='') => {
  return (key?: string) => 
    (target: Object, name: string, index:number) => {
    const previousMetaData = Reflect.getMetadata(PARAMETER_METADATA, target, name) || [];
    const newParameterMetadata = [{key, index, type, method: name}, ...previousMetaData];

    Reflect.defineMetadata(PARAMETER_METADATA, newParameterMetadata, target, name);
  }
}

const Params = createParamDecorator('params');
const Query = createParamDecorator('query');
const Body = createParamDecorator('body');

export { Params, Query, Body };
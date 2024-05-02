import 'reflect-metadata';
import { Get, Post, Delete, Put, Batch } from './method';
import { Controller } from './controller';
import { Factory, Register } from './beanFactory';

import { server } from './http';

import { router } from './router';
import { Injectable, isInjectable } from './container';
import { MODULE_METADATA_KEY, MODULE_CONTROLLER_METADATA_KEY, MODULE_PROVIDER_METADATA_KEY, MODULE_MODULE_METADATA_KEY } from './contants';

import { koaBody } from "koa-body"
import { Params, Query, Body } from './parameter';

import { Bootstrap, controllerLoader, providerLoader }  from './request';

import { Middleware } from './middleware'; 


const eachModules = (modules:any) => {
  modules.forEach((moduleElement:any) => {
    const isModule = Reflect.getMetadata(MODULE_METADATA_KEY, moduleElement);
    const moduleController = Reflect.getMetadata(MODULE_CONTROLLER_METADATA_KEY, moduleElement);
    const moduleProvider = Reflect.getMetadata(MODULE_PROVIDER_METADATA_KEY, moduleElement);
    const moduleModules = Reflect.getMetadata(MODULE_MODULE_METADATA_KEY, moduleElement);
    
    providerLoader(moduleProvider);
    controllerLoader(moduleController);

    if(moduleModules) {
      eachModules(moduleModules);
    }
  })
}


const start = (entryModule:any) => {

  server.use(koaBody({
    // 是否支持 multipart-formdata 的表单
    multipart: true,
  }))
 
  const isModule = Reflect.getMetadata(MODULE_METADATA_KEY, entryModule);
   
  if(isModule){
    const targetObj = new entryModule();
    targetObj.factory && targetObj.factory(server);
  }

  const moduleController = Reflect.getMetadata(MODULE_CONTROLLER_METADATA_KEY, entryModule);
  const moduleProvider = Reflect.getMetadata(MODULE_PROVIDER_METADATA_KEY, entryModule);
  const moduleModules = Reflect.getMetadata(MODULE_MODULE_METADATA_KEY, entryModule);
  // console.log('entryModuleResult', isModule);
  // console.log('entryModuleResult controller', moduleController);
  // console.log('entryModuleResult provtder', moduleProvider);
  // console.log('entryModuleResult module', moduleModules);
  providerLoader(moduleProvider);
  controllerLoader(moduleController);

  eachModules(moduleModules);

  server.use(router.routes()).use(router.allowedMethods());
  // server.listen(8091, ()=>{
  //   console.log('server start success');
  // })

  return {
    listen: (port=8091) => {
      server.listen(port, ()=>{
        console.log('server start success');
      })
    }
  }

}

export {Get, Post, Delete, Put, Batch, Bootstrap, start, Controller, Injectable, isInjectable, Factory, router, Register, Params, Query, Body, Middleware };
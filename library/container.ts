import {INJECTABLE_METADATA_KEY} from './contants';


/**
 * 判定是控制反转的提供者（类）
 */
export const isInjectable = (target: new (...args:any[]) => any) => {
  return (
    typeof target === "function" && Reflect.getMetadata(INJECTABLE_METADATA_KEY, target)
  )
}

/**
 * 类装饰器
 * @Injectable 标注该类是可以交给容器进行实例化，控制反转的
 */
export const Injectable = () => {
  return (target: new (...args:any[]) => any) => {
    Reflect.defineMetadata(INJECTABLE_METADATA_KEY, true, target);
  }
}



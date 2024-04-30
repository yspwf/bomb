import { isInjectable } from './container';
import { INJECTABLE_METADATA_KEY } from './contants';

class BeanFactory{

  private container: Record<string|symbol, new (...args:any[]) => any>;

  constructor(){
    this.container = {};
  }

  bind(target: new (...args:any[]) => any, name?: string | symbol){
    if(isInjectable(target)){
      const containerName = name ? name : target.name;
      this.container[target.name] = target;
    }
  }


  use(target: new (...args:any[]) => any){
    const bean = this.container[target.name];
    if (!bean) {
      throw new Error(`${target.name} no bind`);
    }
    // console.log(bean)
    // const result = Reflect.construct(bean, []);
    // console.log(result)
    return bean;
  }

}

const beanFactory = new BeanFactory();

// const Injectable = () => {
//   return (target: new (...args:any[]) => any) => {
//     beanFactory.Inject(target);
//   }
// }

const Register = (target: new (...args:any[]) => any) => {
  return beanFactory.bind(target);
}

const Factory = (target: new (...args:any[]) => any) => {
  return beanFactory.use(target);
}

export { Factory, Register};
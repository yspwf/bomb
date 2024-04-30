import { Injectable } from '../../library';

import { getManager } from 'typeorm';
import { User } from '../entity/user';

@Injectable()
export class OrderService{

  async firstFunc(){
    const entityManager = getManager()
    const res:Array<User> = await entityManager.find(User);
    return res;
    // return 'OrderService firstFunc';
  }

}
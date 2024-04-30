import { Injectable } from '../library';

@Injectable()
export class HomeService{

  firstFunc(){
    return 'server HomeService';
  }

}
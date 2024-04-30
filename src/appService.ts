import { Injectable } from '../library';

import { getManager } from 'typeorm';

import { Article } from './entity/article';


@Injectable()
export class AppService{

  async firstFunc(){
    const entityManager = getManager()
    const res:Array<Article> = await entityManager.find(Article);
    return res;
    // const articleRepository = getManager().getRepository(Article);
    // const articles = await articleRepository.find();
    // console.log()
    // return articles;
    // return [
    //   {
    //     id: 1,
    //     title: 'MySQL存储文章',
    //     body: 'MySQL是一个流行的关系型数据库管理系统，用于存储、管理和访问数据。在创建网站或应用程序时，MySQL通常被用作存储文章、博客、新闻等内容的地方。',
    //     author: 'John Doe',
    //     created_at: '2024-01-13T23:09:33.000Z'
    //   }
    // ];  
  }

}
import DataLoader from "dataloader";
import { Op } from "sequelize";
import NewsModel from "../models/news.model";
import config from "../config/env/config";
import BaseService from "./base.services";
import { News } from "../interfaces/news.interface";
import { User } from "../interfaces/user.interface";
import queue from "../core/queue";

class NewsService extends BaseService {
  _salt = 10;
  _jwtSecret = config.jwtSecret;
  dataLoader: DataLoader<string, NewsModel>
  constructor( ) {
    super();
    
  }

  async listNews(params: any, options?: any) {
    const isPublisher = this.isPublisher(options.auth)
    const where:any = {};
    
    if (isPublisher) {
      where.publisherId = options.auth.id;
    } else if (params.publisherId) {
      where.publisherId = params.publisherId;
    }
    const result = await NewsModel.findAndCountAll({
      where: where,
      limit: params.limit,
      offset: this._offset(params.page, params.limit)
    })
    return {
      items: result.rows,
      pagination: this._pagination(params.page, params.limit, result.count)
    }
  }
  
  async createNews(paramNews: NewsModel, options?: any) {
    const isPublisher = this.isPublisher(options.auth)
    if (!isPublisher) {
      throw new Error('You are not publisher')
    }
    paramNews.publisherId = options.auth.id;
    const news = await NewsModel.create(paramNews)
    return news
  }
  
  async readNews(id: any, options?: any) {
    const where:any = {
      id
    };
    const news: NewsModel|null = await NewsModel.findOne({
      where: where,
    });
    if (!news) throw new Error('News does not exists');
    await this.callbackNewsRead(news)
    return news;
  }

  async callbackNewsRead(news: NewsModel) {
    // TODO:
    // - load publisher callback info and push callback to queue to process notify
    const body = {
      headers:{
      },
      body: {
        newId: news.id,
        publisherId: news.publisherId,
      },
      action: "notify_news_read"
    }
    queue.push(body)
    return true;
  }

  isPublisher(auth: User) {
    if (!auth || !auth.isPublisher) return false;
    return true
  }

}

export default NewsService;
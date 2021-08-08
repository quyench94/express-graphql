import { News } from "../../interfaces/news.interface";
import NewsService from "../../services/news.service"
import UserService from "../../services/user.service";
import CategoryService from "../../services/category.service";

const newsService = new NewsService();
const userService = new UserService();
const categoryService = new CategoryService();
export default {
  Query: {
    newsList: (root: any, args: any, context: any, info: any) => {
      
      const options = { auth: context.auth }
      return newsService.listNews(args, options)
    },
    newsRead: (root: any, args: any, context: any, info: any) => {
      const options = { auth: context.auth }
      return newsService.readNews(args.id, options)
    }
  },

  Mutation: {
    newsCreate: (root: any, args: any, context: any, info: any) => {
      const options = { auth: context.auth }
      return newsService.createNews(args.input, options).then(news => {
        return news;
      })
    },
  },
  News: {
    publisher: (news: News) => {
      return userService.getUser({id: news.publisherId});
    },
    category: (news: News) => {
      return categoryService.getCategory(news.categoryId);
    }
  }
}
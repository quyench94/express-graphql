import { Category } from "./category.interface";
import { User } from "./user.interface";


export interface News {
  id: string
  title: string
  description: string
  categoryId: string
  category: Category
  publisherId: string
  publisher: User
}

export interface NewsNotifyPublisher {
  headers: {
    requestId: string
  },
  body: {
    newId: number
    publisherId: number
  }
}
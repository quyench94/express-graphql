import DataLoader from "dataloader";
import { Op } from "sequelize";
import CategoryModel from "../models/category.model";
import config from "../config/env/config";
import BaseService from "./base.services";
import { Category } from "../interfaces/category.interface";

class CategoryService extends BaseService {
  constructor( ) {
    super();
    
  }


  async getCategory(id: any, options?: any) {
    const where:any = {
      id
    };
    return await CategoryModel.findOne({
      where: where,
    })
  }

  async listCategory(params: any, options?: any) {
    const where:any = {};
    if (params.isPublisher) where.isPublisher = true;
    const result = await CategoryModel.findAndCountAll({
      where: where,
      limit: params.limit,
      offset: this._offset(params.page, params.limit)
    })
    return {
      items: result.rows,
      pagination: this._pagination(params.page, params.limit, result.count)
    }
  }
  
  async createCategory(paramCategory: CategoryModel) {
    const category = await CategoryModel.create(paramCategory)
    return category
  }
}

export default CategoryService;
import CategoryService from "../../services/category.service"

const categoryService = new CategoryService();
export default {
  Query: {
    categories: (obj:any, args:any) => {
      return categoryService.listCategory(args)
    },
  },

  Mutation: {
    categoryCreate: (obj:any, args:any) => {
      return categoryService.createCategory(args.input).then(category => {
        return category;
      })
    },
  }
}
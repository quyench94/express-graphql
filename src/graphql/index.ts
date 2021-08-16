import { mergeSchemas, mergeTypeDefs, mergeResolvers } from '@graphql-tools/merge';
import { loadFilesSync } from '@graphql-tools/load-files';

import userResolvers from './user/user.resolvers'
import newsResolvers from './news/news.resolvers'
import categoryResolvers from './category/category.resolvers'

const typesArray = loadFilesSync(`${__dirname}/**/*.graphql`, { recursive: true })

const typeDefs = mergeTypeDefs(typesArray);
const resolvers = mergeResolvers([userResolvers, newsResolvers, categoryResolvers]);



export default mergeSchemas({
  schemas: [],
  typeDefs: typeDefs,
  resolvers
});
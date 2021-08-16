import { ApolloServer } from "apollo-server-express";
import express from "express";
import { User } from "./user.interface";

export interface Pagination {
  limit: number,
  page: number,
  total: number
}
export interface App extends express.Express {
  graphqlServer: ApolloServer
  loaders: any 
}

export interface CustomRequest extends express.Request {
  auth: User | boolean
  loaders?: any
  requestId?: string
}
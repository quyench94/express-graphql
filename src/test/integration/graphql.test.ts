process.env.NODE_ENV = 'test';

import {appClient} from '../../app';
import NewsService from '../../services/news.service';
import CategoryService from '../../services/category.service';
import UserService from '../../services/user.service';
import UserModel from '../../models/user.model';
import NewsModel from '../../models/news.model';
import { expect } from 'chai';

describe("Integration: Graphql integration test", function () {
  let newsService = new NewsService()
  let categoryService = new CategoryService()
  let userService = new UserService()
  let graphqlServer = appClient.graphqlServer;
  const data = {
    "registerInput": {
      "email": "quyench@gmail.com13",
      "password": "asd@!@#",
      "isPublisher": true,
      "publisherWebhook": "http://webhook.site/d36a7d35-d1e0-47a5-a0cc-37985bb920a5"
    },
    "loginInput": {
      "email": "quyench@gmail.com13",
      "password": "asd@!@#",
    },
    "loginInputFakePassword": {
      "email": "quyench@gmail.com13",
      "password": "asd@!@#Fakepassword",
    },
    "newsCreateInput": {
      "title": "News from Covid-19",
      // "publisherId": null,
      "categoryId": null
    },
    "userLogged": {
      "id": null,
      "jwtToken": null
    },
    "newsReadId": 17
  }
  before(async () => {
    const user = await UserModel.findOne({
      where: {
        email: data.registerInput.email 
      }
    })
    await NewsModel.destroy({
      where: {
        publisherId: user?.id
      }
    })
    await UserModel.destroy({
      where: {
        id: user?.id
      }
    })
  });

  describe("User register", function () {
    it('it must register success and return user id', async () => {
      const res = await graphqlServer.executeOperation({ 
        query: `
          mutation($registerInput: UserRegister){
            register(input: $registerInput) {
              firstName
              lastName
              email
              isPublisher
            }
          }`,
        variables: data });
      
      expect(res.errors).equal(undefined);
      expect(res.data?.register).has.ownProperty('firstName');
      expect(res.data?.register).has.ownProperty('email');
    })

    it('it must register failed with email existed', async () => {
      const res = await graphqlServer.executeOperation({ 
        query: `
          mutation($registerInput: UserRegister){
            register(input: $registerInput) {
              firstName
              lastName
              email
              isPublisher
            }
          }`,
        variables: data });
      expect(res.errors).not.equal(undefined);
    })
  })

  describe("User login", function () {
    it('it must login success and return user id, jwtToken', async () => {
      const res = await graphqlServer.executeOperation({ 
        query: `
          mutation($loginInput: UserLogin){
            login(input: $loginInput) {
              id
              jwtToken
            }
          }`,
        variables: data });
      
      expect(res.errors).equal(undefined);
      expect(res.data?.login).has.ownProperty('id');
      expect(res.data?.login).has.ownProperty('jwtToken');
      data.userLogged.id = res.data?.login.id;
      data.userLogged.jwtToken = res.data?.login.jwtToken;
    })

    it('it must login failed with message fake password', async () => {
      const res = await graphqlServer.executeOperation({ 
        query: `
          mutation($loginInputFakePassword: UserLogin){
            login(input: $loginInputFakePassword) {
              id
              jwtToken
            }
          }`,
        variables: data });
      expect(res.errors).not.equal(undefined);
    })
  })
  
  describe("List news", function () {
    it('it must return list news, each news has publisher and category info ', async () => {
      const res = await graphqlServer.executeOperation({ 
        query: `
          query{
            newsList(limit: 2, page: 1) {
              items {
                id
                title
                publisher {
                  id
                  email
                }
                category {
                  name
                }
              }
              pagination {
                limit
                page
                total
              }
            }
          }`,
        variables: data });
      
      expect(res.errors).equal(undefined);
      expect(res.data?.newsList).has.ownProperty('items');
      expect(res.data?.newsList).has.ownProperty('pagination');
      res.data?.newsList.items.map((news: NewsModel) => {
        expect(news).has.ownProperty('id');
        expect(news).has.ownProperty('title');
        expect(news).has.ownProperty('publisher');
        expect(news.publisher).has.ownProperty('id');
        expect(news.category).has.ownProperty('name');
      })
    })
  })
  
  describe("List categories", function () {
    it('it must return list category', async () => {
      const res = await graphqlServer.executeOperation({ 
        query: `
          query {
            categories {
              items {
                code
                id
                name
              }
              pagination {
                limit
              }
            }
          }`,
        variables: data });
      
      expect(res.errors).equal(undefined);
      expect(res.data?.categories).has.ownProperty('items');
      expect(res.data?.categories).has.ownProperty('pagination');
      res.data?.categories.items.map((news: NewsModel) => {
        expect(news).has.ownProperty('id');
        expect(news).has.ownProperty('code');
        expect(news).has.ownProperty('name');
      })

      data.newsCreateInput.categoryId = res.data?.categories.items[0].id
    })
  })
  
  describe("Create news", function () {
    it('it must create new failed when user is not publisher ', async () => {
      const res = await graphqlServer.executeOperation({ 
        query: `
          mutation($newsCreateInput: NewsInput){
            newsCreate(input: $newsCreateInput) {
              id
              title
              publisher {
                id
                email
              }
              category {
                code
                name
              }
            }
          }`,
        variables: data,
       });
      
      expect(res.errors).not.equal(undefined);
    })
  })
  
  describe("Read news", function () {
    it('it must return list news, each news has publisher and category info ', async () => {
      const res = await graphqlServer.executeOperation({ 
        query: `
          query($newsReadId: ID!){
            newsRead(id: $newsReadId) {
              id
              title
              publisher {
                id
                email
              }
              category {
                code
                name
              }
            }
          }`,
        variables: data });
      
      expect(res.errors).equal(undefined);
      expect(res.data).has.ownProperty('newsRead');
      expect(res.data?.newsRead).has.ownProperty('id');
      expect(res.data?.newsRead).has.ownProperty('title');
      expect(res.data?.newsRead).has.ownProperty('publisher');
      expect(res.data?.newsRead.publisher).has.ownProperty('id');
      expect(res.data?.newsRead.category).has.ownProperty('name');
    })
  })

  after(function (done) {
    done()
  });
});
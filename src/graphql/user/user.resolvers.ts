import UserService from "../../services/user.service"

const userService = new UserService();
export default {
  Query: {
    users: (obj:any, args:any) => {
      return userService.listUser(args)
    },
    user: (obj:any, args:any) => {
      return userService.getUser(args)
    },
    publishers: (obj:any, args:any) => {
      args.isPublisher = true;
      return userService.listUser(args)
    },
    publisher: (obj:any, args:any) => {
      args.isPublisher = true;
      return userService.getUser(args);
    }
  },

  Mutation: {
    register: (obj:any, args:any) => {
      return userService.register(args.input)
      
    },
    login: (obj:any, args:any) => {
      return userService.login(args.input)
    },
  }
}
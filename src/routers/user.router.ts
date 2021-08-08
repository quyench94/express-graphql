import {Router} from 'express';
import UserService from '../services/user.service';

const userRouter = Router();

userRouter.get('/', async (req, res, next) => {
  const userService = new UserService();
  try {
    // const movie = await userService.listAllUser()
    // res.status(201).json(movie);
  } catch (e) {
    next(e);
  }
});

userRouter.post('/', async (req, res, next) => {
  const params = req.body;
  try {
    const userService = new UserService();
    const instance = await userService.register(params);
    // res.status(201).json(instance);
    return instance
  } catch (e) {
    next(e)
  }
});

export default userRouter;
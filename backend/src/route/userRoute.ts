import { UserController } from '../controller';
import { Router } from 'express';
import { UserRepository } from '../repository';
import { UserService } from '../service';

const userRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);

userRouter.use('/api', userController.router);

export { userRouter };

import { UserController, AuthController } from '../controller';
import { Router } from 'express';
import { UserRepository } from '../repository';
import { UserService } from '../service';
import { AuthMiddleware } from '../middlewares';

const userRouter = Router();
const authRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const userController = new UserController(userService);
const authMiddleware = new AuthMiddleware(userService);
const authController = new AuthController(userService, authMiddleware);

userRouter.use('/api', userController.router);
authRouter.use('/auth', authController.router);

export { userRouter, authRouter };

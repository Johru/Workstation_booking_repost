import { UserController, AuthController } from '../controller';
import { Router } from 'express';
import { UserRepository } from '../repository';
import { UserService } from '../service';
import { AuthMiddleware } from '../middlewares';
import { EmailService } from '../service/e-mail/emailService';

const userRouter = Router();
const authRouter = Router();

const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authMiddleware = new AuthMiddleware(userService);
const emailService = new EmailService();
const authController = new AuthController(
  userService,
  authMiddleware,
  emailService
);
const userController = new UserController(userService, authMiddleware);

userRouter.use('/api', userController.router);
authRouter.use('/auth', authController.router);

export { userRouter, authRouter };

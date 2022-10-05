import { Response, Request, NextFunction } from 'express';
import { UserService } from '../service';

export class AuthMiddleware {
  constructor(private userService: UserService) {}

  async checkSignUp(req: Request, res: Response, next: NextFunction) {
    const { user_login, user_email } = req.body;

    if (!(user_login && user_email)) {
      res.status(400).json({
        error: 'Something is wrong with the request body.',
      });
      return;
    }

    const isUserWithEmailExists = await this.userService.findUserByEmail(
      user_email
    );

    if (isUserWithEmailExists) {
      res.status(400).json({
        error: 'Email is already in use!',
      });
      return;
    }

    const isUserWithLoginExists = await this.userService.findUserByLogin(
      user_login
    );

    if (isUserWithLoginExists) {
      res.status(400).json({
        error: 'Login name is already in use!',
      });
      return;
    }

    next();
  }
}

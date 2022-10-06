import { Router, Response, Request } from 'express';
import { UserService } from '../service';
import logger from '../logger';
import { UserEntity } from 'db';
import { AuthMiddleware } from '../middlewares';

export class AuthController {
  private readonly _router: Router = Router();

  constructor(
    private userService: UserService,
    private authMiddleware: AuthMiddleware
  ) {
    this._router.post(
      '/registration',
      (req, res, next) => this.authMiddleware.checkSignUp(req, res, next),
      async (req: Request, res: Response) => {
        logger.info('new user endpoint accessed');
        const user: UserEntity = req.body as UserEntity;
        res.json(await this.userService.createUser(user));
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}

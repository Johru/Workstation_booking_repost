import { Router, Response, Request } from 'express';
import { UserService } from '../service';
import logger from '../logger';

export class UserController {
  private readonly _router: Router = Router();

  constructor(private userService: UserService) {
    this._router.get('/user', async (req: Request, res: Response) => {
      logger.info('/user endpoint accessed');

      res.json(await this.userService.listUsers());
    });
  }

  get router(): Router {
    return this._router;
  }
}

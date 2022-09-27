import { Router } from 'express';
import { UserService } from '../service/user/userService';

export class UserController {
  private readonly _router: Router = Router();

  constructor(private userService: UserService) {
    this._router.get('/user', async (req: any, res: any) => {
      console.log('/user endpoint accessed');

      res.json(await userService.listUsers());
    });
  }

  get router(): Router {
    return this._router;
  }
}

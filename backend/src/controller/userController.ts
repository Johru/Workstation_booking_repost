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

    this._router.delete(
      '/user/:id/delete',
      async (req: Request, res: Response) => {
        logger.info('/api/user/:id/delete endpoint accessed');
        const userId = req.params.id as unknown as number;
        res.json(await this.userService.deleteUser(userId));
      }
    );

    this._router.patch(
      '/user/:id/promote',
      async (req: Request, res: Response) => {
        logger.info('api/user/:id/promote endpoint accessed');
        const userId = req.params.id as unknown as number;
        res.json(await this.userService.promoteUserToAdmin(userId));
      }
    );
    this._router.patch(
      '/user/:id/demote',
      async (req: Request, res: Response) => {
        logger.info('api/user/:id/demote endpoint accessed');
        const userId = req.params.id as unknown as number;
        res.json(await this.userService.demoteUserFromAdmin(userId));
      }
    );

    this._router.patch(
      '/user/:id/block',
      async (req: Request, res: Response) => {
        logger.info('api/user/:id/block endpoint accessed');
        const userId = req.params.id as unknown as number;
        res.json(await this.userService.blockUser(userId));
      }
    );

    this._router.patch(
      '/user/:id/unblock',
      async (req: Request, res: Response) => {
        logger.info('api/user/:id/unblock endpoint accessed');
        const userId = req.params.id as unknown as number;
        res.json(await this.userService.unblockUser(userId));
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}

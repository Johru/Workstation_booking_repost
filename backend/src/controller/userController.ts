import { Router, Response, Request } from 'express';
import { UserService } from '../service';
import { AuthMiddleware } from 'middlewares';
import logger from '../logger';

export class UserController {
  private readonly _router: Router = Router();

  constructor(
    private userService: UserService,
    private authMiddleware: AuthMiddleware
  ) {
    const verifyJWT = this.authMiddleware.verifyJWT;
    const isAdmin = this.authMiddleware.isAdmin;

    this._router.get(
      '/user',
      verifyJWT,
      isAdmin,
      async (req: Request, res: Response) => {
        logger.info('/user endpoint accessed');
        res.json(await this.userService.listUsers());
      }
    );

    this._router.delete(
      '/user/:id/delete',
      verifyJWT,
      isAdmin,
      async (req: Request, res: Response) => {
        logger.info('/api/user/:id/delete endpoint accessed');
        const userId = req.params.id as unknown as number;
        res.json(await this.userService.deleteUser(userId));
      }
    );

    this._router.patch(
      '/user/:id/promote',
      verifyJWT,
      isAdmin,
      async (req: Request, res: Response) => {
        logger.info('api/user/:id/promote endpoint accessed');
        const userId = req.params.id as unknown as number;
        res.json(await this.userService.promoteUserToAdmin(userId));
      }
    );
    this._router.patch(
      '/user/:id/demote',
      verifyJWT,
      isAdmin,
      async (req: Request, res: Response) => {
        logger.info('api/user/:id/demote endpoint accessed');
        const userId = req.params.id as unknown as number;
        res.json(await this.userService.demoteUserFromAdmin(userId));
      }
    );

    this._router.patch(
      '/user/:id/block',
      verifyJWT,
      isAdmin,
      async (req: Request, res: Response) => {
        logger.info('api/user/:id/block endpoint accessed');
        const userId = req.params.id as unknown as number;
        res.json(await this.userService.blockUser(userId));
      }
    );

    this._router.patch(
      '/user/:id/unblock',
      verifyJWT,
      isAdmin,
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

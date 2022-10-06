import { Router, Response, Request } from 'express';
import { UserService } from '../service';
import logger from '../logger';
import { UserEntity } from 'db';
import { AuthMiddleware } from '../middlewares';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config';

export class AuthController {
  private readonly _router: Router = Router();

  async passwordCheckAndToken(
    req: Request,
    res: Response,
    userFound: UserEntity | null
  ) {
    const isValidPassword = await bcrypt.compare(
      req.body.user_password,
      userFound?.user_password as string
    );

    if (!isValidPassword)
      return res
        .status(401)
        .send({ error: 'User not found  or incorrect password' });

    const token = jwt.sign({ id: userFound?.user_id }, config.secret!, {
      expiresIn: config.tokenExpiry,
    });

    res.json({
      user_id: userFound?.user_id,
      token: token,
    });
  }

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

    this._router.post('/login-login', async (req: Request, res: Response) => {
      logger.info('login-login endpoint accessed');
      const login = req.body.user_login;
      const userFound = await this.userService.findUserByLogin(login);
      if (!userFound)
        return res
          .status(401)
          .send({ error: 'User not found or incorrect password' });

      this.passwordCheckAndToken(req, res, userFound);
    });

    this._router.post('/login-email', async (req: Request, res: Response) => {
      logger.info('login-email endpoint accessed');
      const email = req.body.user_email;
      const userFound = await this.userService.findUserByEmail(email);
      if (!userFound)
        return res
          .status(401)
          .send({ error: 'User not found or incorrect password' });

      this.passwordCheckAndToken(req, res, userFound);
    });
  }

  get router(): Router {
    return this._router;
  }
}

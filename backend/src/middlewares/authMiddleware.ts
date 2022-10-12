import { Response, Request, NextFunction } from 'express';
import { UserService } from '../service';
import config from '../config';
import { Secret, verify } from 'jsonwebtoken';
import { UserEntity } from '../db';

declare global {
  namespace Express {
    export interface Request {
      user: UserEntity;
      id: number;
    }
  }
}

interface JwtPayload {
  id: number;
}

export class AuthMiddleware {
  constructor(private userService: UserService) {}

  checkSignUp = async (req: Request, res: Response, next: NextFunction) => {
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
  };

  verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader)
      return res.status(401).json({ error: 'Please log in first' });
    if (authHeader?.split(' ')[0] != 'Bearer') {
      return res.status(401).json({ error: 'Token not valid' });
    }
    const token = authHeader?.split(' ')[1];
    if (token == null) return res.sendStatus(401);
    try {
      const payload = verify(token, config.secret as Secret) as JwtPayload;
      req.id = payload.id;
    } catch {
      res.sendStatus(403).json({ error: 'Token is not valid' });
      return;
    }
    next();
  };

  isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.id;
    const user = await this.userService.findUserById(id);
    if (user != null) {
      if (user.user_isadmin === true) {
        res.status(401).json({ error: 'unauthorized request' });
        return;
      }
      next();
    }
  };

  isBlocked = async (req: Request, res: Response, next: NextFunction) => {
    const id = req.id;
    const user = await this.userService.findUserById(id);
    if (user != null) {
      if (user.user_isblocked === true) {
        res.status(401).json({ error: 'access denied' });
        return;
      }
      next();
    }
  };
}

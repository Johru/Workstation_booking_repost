import { Response, Request, NextFunction } from 'express';
import { UserService } from '../service';
import { UserEntity } from '../db';

declare global {
  namespace Express {
    export interface Request {
      user: UserEntity;
    }
  }
}

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

  async verifyJWT(req: Request, res: Response, next: NextFunction) {
    // 1. Get auth header from req
    // 2. Check the value of token - Bearer prefix
    // 3. Verify with JWT.verify(token, secret, callBackFn(err, decoded))
    // 4. From decoded (payload) - get ID
    // 5. request.id = id from payload

    // findUserById service/repository
    // 6. next()

  //   const authHeader = req.headers['authorization'];
  //   const token = authHeader && authHeader.split(' ')[1];
  //   if (token == null) return res.sendStatus(401);
  //   jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
  //     if (err) return res.sendStatus(403);
  //   req.user = user;
  //     next();
  //   }
  // }


  async isAdmin(req: Request, res: Response, next: NextFunction) {
    // 1. req.user.id
    // 2. run findById(req.id)
    // 3. create method findById in repository/service
    // 4. returns user
    // 5. if !admin - res.sendStatus(401).json('unauthorized request')
    // 5. check If user_isAdmin == true --  // 6. next()
   
  }

  async isUser(req: Request, res: Response, next: NextFunction) {
    // 1. req.id
    // 2. run findById(req.id)
    // 3. create method findById in repository/service
    // 4. returns user
    // 5. check If user_isBlocked
    // 6. next()
  }

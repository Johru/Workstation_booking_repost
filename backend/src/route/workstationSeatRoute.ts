import { Router } from 'express';

import { SeatController } from '../controller';
import { SeatRepository, UserRepository } from '../repository';
import { SeatService, UserService } from '../service';

import { WorkstationController } from '../controller';
import { WorkstationRepository } from '../repository';
import { WorkstationService } from '../service';
import { AuthMiddleware } from '../middlewares';

const seatRouter = Router();
const workstationRouter = Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);
const authMiddleware = new AuthMiddleware(userService);
const workstationRepository = new WorkstationRepository();

const workstationService = new WorkstationService(workstationRepository);
const workstationController = new WorkstationController(
  workstationService,
  authMiddleware
);

const seatRepository = new SeatRepository();
const seatService = new SeatService(seatRepository);
const seatController = new SeatController(seatService);

workstationRouter.use('/api', workstationController.router);
seatRouter.use('/api', seatController.router);

export { workstationRouter, seatRouter };

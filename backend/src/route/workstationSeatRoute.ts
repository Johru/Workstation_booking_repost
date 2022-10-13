import { Router } from 'express';

import { SeatController } from '../controller';
import { SeatRepository } from '../repository';
import { SeatService } from '../service';

import { WorkstationController } from '../controller';
import { WorkstationRepository } from '../repository';
import { WorkstationService } from '../service';

const seatRouter = Router();
const workstationRouter = Router();

const workstationRepository = new WorkstationRepository();
const workstationService = new WorkstationService(workstationRepository);
const workstationController = new WorkstationController(workstationService);

const seatRepository = new SeatRepository();
const seatService = new SeatService(seatRepository);
const seatController = new SeatController(seatService);

workstationRouter.use('/api', workstationController.router);
seatRouter.use('/api', seatController.router);

export { workstationRouter, seatRouter };

// import { TodoController } from '../controller';
import { Router } from 'express';
// import { TodoRepository } from '../repository';
// import { TodoService } from '../service';

import { SeatController } from '../controller';
import { SeatRepository } from '../repository';
import { SeatService } from '../service';

import { WorkstationController } from '../controller';
import { WorkstationRepository } from '../repository';
import { WorkstationService } from '../service';

const router = Router();

const workstationRepository = new WorkstationRepository();
const workstationService = new WorkstationService(workstationRepository);
const workstationController = new WorkstationController(workstationService);

const seatRepository = new SeatRepository();
const seatService = new SeatService(seatRepository);
const seatController = new SeatController(seatService);

router.use('/api', workstationController.router);
router.use('/api', seatController.router);

export { router };

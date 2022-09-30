import { ReservationController } from '../controller';
import { Router } from 'express';
import { ReservationService } from '../service';
import { ReservationRepository } from '../repository';

const reservationRouter = Router();

const reservationRepository = new ReservationRepository();
const reservationService = new ReservationService(reservationRepository);
const reservationController = new ReservationController(reservationService);

reservationRouter.use('/api', reservationController.router);

export { reservationRouter };

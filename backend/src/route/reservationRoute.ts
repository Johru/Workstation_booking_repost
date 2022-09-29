import { ReservationController } from '../controller/index';
import { Router } from 'express';
import { ReservationService } from '../service/index';
import { ReservationRepository } from '../repository/index';

const reservationRouter = Router();

const reservationRepository = new ReservationRepository();
const reservationService = new ReservationService(reservationRepository);
const reservationController = new ReservationController(reservationService);

reservationRouter.use('/api', reservationController.router);

export { reservationRouter };

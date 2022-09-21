import { ReservationController } from '../controller';
import { Router } from 'express';
import { SeatRepository } from '../repository';
import { SeatService } from '../service/seatService';
import { ReservationService } from '../service/reservation/reservationService';
import { ReservationRepository } from '../repository/reservationRepository';

const reservationRouter = Router();

const reservationRepository = new ReservationRepository();
const reservationService = new ReservationService(reservationRepository);
const reservationController = new ReservationController(reservationService);

reservationRouter.use('/api', reservationController.router);

export { reservationRouter };

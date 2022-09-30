import { ReservationController } from '../controller';
import { Router } from 'express';
<<<<<<< HEAD
import { ReservationService } from '../service/reservation/reservationService';
import { ReservationRepository } from '../repository/reservationRepository';
=======
import { ReservationService } from '../service';
import { ReservationRepository } from '../repository';
>>>>>>> 4226b1a64296bb5bfd38076fef0c8674c75a721a

const reservationRouter = Router();

const reservationRepository = new ReservationRepository();
const reservationService = new ReservationService(reservationRepository);
const reservationController = new ReservationController(reservationService);

reservationRouter.use('/api', reservationController.router);

export { reservationRouter };

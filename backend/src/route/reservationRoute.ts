import { ReservationController } from '../controller';
import { Router } from 'express';
import { ReservationService } from '../service';
import { ReservationRepository } from '../repository';
import { EmailService } from '../service/e-mail/emailService';

const reservationRouter = Router();

const reservationRepository = new ReservationRepository();
const reservationService = new ReservationService(reservationRepository);
const emailService = new EmailService();
const reservationController = new ReservationController(
  reservationService,
  emailService
);

reservationRouter.use('/api', reservationController.router);

export { reservationRouter };

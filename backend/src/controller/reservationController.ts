import { Router, Request, Response } from 'express';
import logger from '../logger';
import { ReservationService } from '../service';
import { EmailService } from 'service/e-mail/emailService';
import { ReservationEntity } from 'db';

export class ReservationController {
  private readonly _router: Router = Router();

  constructor(
    private reservationService: ReservationService,
    private emailService: EmailService
  ) {
    this._router.get(
      '/reservation/:id/date',
      async (req: Request, res: Response) => {
        logger.info('/reservation/date endpoint accessed');
        const workstationId: number = req.params.id as unknown as number;
        const reservationDate: string = req.query.reservation_date as string;
        res.json(
          await this.reservationService.showReservationForGivenDate(
            workstationId,
            reservationDate
          )
        );
      }
    );

    this._router.get(
      '/reservation/user/:id',
      async (req: Request, res: Response) => {
        logger.info('/reservation/user/:id endpoint accessed');
        const userId = req.params.id as unknown as number;
        res.json(
          await this.reservationService.showReservationForGivenUser(userId)
        );
      }
    );

    this._router.post(
      '/reservation/new',
      async (req: Request, res: Response) => {
        logger.info('/reservation/new endpoint accessed');
        const body = req.body;
        const response = await this.reservationService.addNewReservation(body);
        this.emailService.sendSuccessfullReservation(response.data);
        res.json(response);
      }
    );

    this._router.delete(
      '/reservation/:id/delete',
      async (req: Request, res: Response) => {
        logger.info('/reservation/delete endpoint accessed');
        const reservationId = req.params.id as unknown as number;
        res.json(
          await this.reservationService.deleteReservation(reservationId)
        );
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}

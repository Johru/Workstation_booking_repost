import { Router, Request, Response } from 'express';
import logger from '../logger';
import { ReservationService } from '../service';
import { EmailService } from 'service/e-mail/emailService';
import { ReservationEntity } from 'db';
import { GoogleCalendarService } from 'service/google-calendar/google-calendarService';

export class ReservationController {
  private readonly _router: Router = Router();

  constructor(
    private reservationService: ReservationService,
    private emailService: EmailService,
    private googleCalendarService: GoogleCalendarService
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
        if (response.data) {
          this.emailService.sendSuccessfullReservation(response.data[0]);
          //this.googleCalendarService.insertEvent(response.data[0]); not working bcs of paid google cloud platform
        }
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

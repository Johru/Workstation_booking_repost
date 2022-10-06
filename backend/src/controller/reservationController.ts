import { Router, Request, Response } from 'express';
import logger from '../logger';
import { ReservationService } from '../service';

export class ReservationController {
  private readonly _router: Router = Router();

  constructor(private reservationService: ReservationService) {
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
          await this.reservationService.displayReservationForUser(userId)
        );
      }
    );

    this._router.post(
      '/reservation/new',
      async (req: Request, res: Response) => {
        logger.info('/reservation/new endpoint accessed');
        const body = req.body;
        res.json(await this.reservationService.addNewReservation(body));
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

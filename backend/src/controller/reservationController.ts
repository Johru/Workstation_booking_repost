import { Router, Request, Response } from 'express';
import logger from '../logger';
import { ReservationService } from '../service/index';

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
          await reservationService.showReservationForGivenDate(
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
        res.json(await reservationService.displayReservationForUser(userId));
      }
    );

    this._router.post(
      '/reservation/new',
      async (req: Request, res: Response) => {
        logger.info('/reservation/new endpoint accessed');
        const body = req.body;
        res.json(await reservationService.addNewReservation(body));
      }
    );

    this._router.delete(
      '/reservation/:id/delete',
      async (req: Request, res: Response) => {
        logger.info('/reservation/delete endpoint accessed');
        const reservationId = req.params.id as unknown as number;
        res.json(await reservationService.deleteReservation(reservationId));
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}

import { Router } from 'express';
import logger from '../logger';
import { ReservationService } from '../service/index';

export class ReservationController {
  private readonly _router: Router = Router();

  constructor(private reservationService: ReservationService) {
    this._router.get('/reservation/:id/date', async (req: any, res: any) => {
      logger.info('/reservation/date endpoint accessed');
      const workstationId = req.params.id;
      const reservationDate = req.query.reservation_date;
      res.json(
        await reservationService.showReservationForDay(
          workstationId,
          reservationDate
        )
      );
    });

    this._router.get('/reservation/user/:id', async (req: any, res: any) => {
      logger.info('/reservation/user/:id endpoint accessed');

      res.json(
        await reservationService.displayReservationForUser(req.params.id)
      );
    });

    this._router.post('/reservation/new', async (req: any, res: any) => {
      logger.info('/reservation/new endpoint accessed');
      const body = req.body;
      res.json(await reservationService.addNewReservation(body));
    });

    this._router.delete(
      '/reservation/:id/delete',
      async (req: any, res: any) => {
        logger.info('/reservation/delete endpoint accessed');
        const reservationId = req.params.id;
        res.json(await reservationService.deleteReservation(reservationId));
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}

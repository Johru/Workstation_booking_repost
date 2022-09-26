import { Router } from 'express';
import { ReservationService } from '../service/reservation/reservationService';

export class ReservationController {
  private readonly _router: Router = Router();

  constructor(private reservationService: ReservationService) {
    this._router.get('/reservation/:id/date', async (req: any, res: any) => {
      console.log('/reservation/date endpoint accessed');
      const workstationId = req.params.id;
      const reservationDate = req.query.reservationDate;
      res.json(
        await reservationService.showReservationForDay(
          workstationId,
          reservationDate
        )
      );
    });

    this._router.get('/reservation/:id/user', async (req: any, res: any) => {
      console.log('/reservation/user/:id endpoint accessed');

      res.json(await reservationService.displayResForUser(req.params.id));
    });

    this._router.post('/reservation/new', async (req: any, res: any) => {
      console.log('/reservation/new endpoint accessed');
      const body = req.body;
      res.json(await reservationService.addNewReservation(body));
    });

    this._router.delete(
      '/reservation/:id/delete',
      async (req: any, res: any) => {
        console.log('/reservation/delete endpoint accessed');
        const body = req.params.id;
        res.json(await reservationService.deleteReservation(body));
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}

import app from '../app';
import { Router } from 'express';
import { SeatTable } from '../db/models/seat';
import { SeatRepository } from '../repository/seatRepository';
import { appDataSource } from '../db/connection';
import { SeatService } from '../service/seatService';
import { ReservationService } from '../service/reservation/reservationService';

export class ReservationController {
  private readonly _router: Router = Router();
  outputArray: any[] = [];

  constructor(private reservationService: ReservationService) {
    this._router.get('/reservation/date', async (req: any, res: any) => {
      console.log('/reservation/date endpoint accessed');
      const workstationId = req.query.workstationId;
      const reservationDate = req.query.reservationDate;
      console.log('controller: ' + workstationId + '/' + reservationDate);
      res.json(
        await reservationService.showReservationForDay(
          workstationId,
          reservationDate
        )
      );
    });

    this._router.post('/reservation/new', async (req: any, res: any) => {
      console.log('/reservation/new endpoint accessed');
      const body = req.body;
      res.json(await reservationService.addNewReservation(body));
    });

    this._router.delete(
      '/reservation/delete/:id',
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

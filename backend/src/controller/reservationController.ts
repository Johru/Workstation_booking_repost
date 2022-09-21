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
    this._router.post('/reservation/date', async (req: any, res: any) => {
      console.log('get /reservation/date endpoint accessed');
      const body = req.body;
      res.json(await reservationService.showReservationForDay(body));
    });

    this._router.post('/reservation/new', async (req: any, res: any) => {
      console.log('post /reservation/new endpoint accessed');
      const body = req.body;
      res.json(await reservationService.addNewReservation(body));
    });

    this._router.delete('/reservation', async (req: any, res: any) => {
      console.log('delete /reservation endpoint accessed');
    });
  }

  get router(): Router {
    return this._router;
  }
}

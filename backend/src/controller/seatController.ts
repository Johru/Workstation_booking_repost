import { appDataSource } from '../db/connection';
import { Router, Response, Request } from 'express';
import { resourceLimits } from 'worker_threads';

import { ISeatService } from '../service';
import { Seat } from '../db/models/seat';


export class SeatController {
  private readonly _router: Router = Router();

  constructor(private seatService: ISeatService) {

    // get all seats 
    this._router.get('/seat', async (req: Request, res: Response) => {
   res.status(200).json(await this.seatService.getSeats());
    });
    // create seat seat
    this._router.post('/seat', async (req: Request, res: Response) => {
      const seat: Seat = req.body as Seat;
      res.status(200).json(await this.seatService.createSeat(seat));
    });

    // create seats by given number
    this._router.post('/seat/:seat', async (req: Request, res: Response) => {
      res.status(200).json(await this.seatService.createGivenNumberSeat(req, res));
    });

     // delete single seat
    this._router.delete('/seat/:id', async (req: Request, res: Response) => {
      res.status(200).json(await this.seatService.deleteSeat(req, res));
    });
  }

  get router(): Router {
    return this._router;
  }
}
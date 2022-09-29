import { appDataSource } from '../db/connection';
import { Router, Response, Request } from 'express';
import { resourceLimits } from 'worker_threads';
import { ISeatService } from '../service';
import { SeatEntity } from '../db/models/seatEntity';

export class SeatController {
  private readonly _router: Router = Router();

  constructor(private seatService: ISeatService) {
    // get all seats
    this._router.get('/seat/Showall', async (req: Request, res: Response) => {
      res.status(200).json(await this.seatService.getSeats());
    });
    // create seat seat
    this._router.post('/seat/Create', async (req: Request, res: Response) => {
      const seat: SeatEntity = req.body as SeatEntity;
      res.status(200).json(await this.seatService.createSeat(seat));
    });

    // create seats by given number
    this._router.post('/seat/:seat/Create', async (req: Request, res: Response) => {
      res
        .status(200)
        .json(await this.seatService.createGivenNumberSeat(req, res));
    });

    // delete single seat
    this._router.delete(
      '/seat/:seatId/Delete',
      async (req: Request, res: Response) => {
        var result = await this.seatService.deletedSeat(req, res);
        if (result) {
          res.status(200).json('success:yes');
        } else {
          res.status(404).json('success:no');
        }
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}

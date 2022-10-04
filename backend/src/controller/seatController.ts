import { appDataSource } from '../db/connection';
import { Router, Response, Request } from 'express';
import { resourceLimits } from 'worker_threads';
import { ISeatService } from '../service';
import { SeatEntity } from '../db/models/seatEntity';

export class SeatController {
  private readonly _router: Router = Router();

  constructor(private seatService: ISeatService) {
 
    this._router.get('/seat/showall', async (req: Request, res: Response) => {
      res.status(200).json(await this.seatService.getSeats());
    });
 
    this._router.post('/seat/create', async (req: Request, res: Response) => {
      const seat: SeatEntity = req.body as SeatEntity;
      res.status(200).json(await this.seatService.createSeat(seat));
    });

    this._router.post('/seat/:seat/create', async (req: Request, res: Response) => {
      res
        .status(200)
        .json(await this.seatService.createGivenNumberSeat(req, res));
    });

    this._router.delete(
      '/seat/:seatId/delete',
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

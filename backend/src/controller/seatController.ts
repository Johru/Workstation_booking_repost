import { Router, Response, Request } from 'express';
import { ISeatService } from '../service';

export class SeatController {
  private readonly _router: Router = Router();

  constructor(private seatService: ISeatService) {
    this._router.get('/seat/showall', async (req: Request, res: Response) => {
      res.status(200).json(await this.seatService.getSeats());
    });

    this._router.post(
      '/seat/:seat/create',
      async (req: Request, res: Response) => {
        res
          .status(200)
          .json(await this.seatService.createGivenNumberSeat(req, res));
      }
    );

    this._router.delete(
      '/seat/:seatId/delete',
      async (req: Request, res: Response) => {
        var seatId = parseInt(req.params.seatId, 10);
        res.status(200).json(await this.seatService.deletedSeat(seatId));
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}

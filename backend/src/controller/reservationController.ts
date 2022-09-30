import { Router, Request, Response } from 'express';
import logger from '../logger';
import { ReservationService } from '../service';

export class ReservationController {
  private readonly _router: Router = Router();

  constructor(private reservationService: ReservationService) {
<<<<<<< HEAD
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
=======
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
>>>>>>> 4226b1a64296bb5bfd38076fef0c8674c75a721a

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
<<<<<<< HEAD
      async (req: any, res: any) => {
        console.log('/reservation/delete endpoint accessed');
        const body = req.params.id;
        res.json(await reservationService.deleteReservation(body));
=======
      async (req: Request, res: Response) => {
        logger.info('/reservation/delete endpoint accessed');
        const reservationId = req.params.id as unknown as number;
        res.json(
          await this.reservationService.deleteReservation(reservationId)
        );
>>>>>>> 4226b1a64296bb5bfd38076fef0c8674c75a721a
      }
    );
  }

  get router(): Router {
    return this._router;
  }
}

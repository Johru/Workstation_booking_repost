import { appDataSource } from '../db/connection';
import { Router } from 'express';
import { resourceLimits } from 'worker_threads';

import { ISeatService } from '../service';
import { Seat } from '../db/models/seat';


export class SeatController {
  private readonly _router: Router = Router();

  constructor(private seatService: ISeatService) {
    this._router.get('/seat', async (req, res) => {
      const seatRepository = appDataSource.getRepository(Seat);
      const result = await seatRepository.find();
      res.status(200).json(result);
    });

    this._router.post('/seat', async (req, res) => {
      const seat: Seat = req.body as Seat;
      const seatRepository = appDataSource.getRepository(Seat);
      await seatRepository.save(seat);
      res.json(200);
    });


        this._router.post('/seat/:seat', async (req, res) => {
        const seat: Seat = req.body as Seat;
        const seatRepository = appDataSource.getRepository(Seat);

        var numSeats = parseInt(req.params.seat, 10);
        for (let index = 0; index < numSeats; index++) {
            const newSeat: Seat = {
                workstation_id: seat.workstation_id
            }
            await seatRepository.save(newSeat);
        }
        res.json(200);
      });

      this._router.delete('/seat/:id', async (req, res) => {
      var id = parseInt(req.params.id, 10);
      const seat: Seat = req.body as Seat; //to have the template

      const seatRepository = appDataSource.getRepository(Seat); //connection with SQL
      var seatRemove = await seatRepository.find({
        where: {
          seat_id: id,
        },
      });
      await seatRepository.remove(seatRemove) 
      res.json(200);
    });


  }

  get router(): Router {
    return this._router;
  }
}
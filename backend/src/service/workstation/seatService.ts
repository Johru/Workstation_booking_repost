import { SeatEntity} from '../../db';
import { ISeatRepository, Success } from '../../repository';
import { Response, Request } from 'express';

export interface ISeatService {
  getSeats(): Promise<SeatEntity[]>;
  createGivenNumberSeat(
    req: Request,
    res: Response
  ): Promise<{ status: string; message: string[] }>;
  deletedSeat(seatId: number): Promise<Success>;
}

export class SeatService implements ISeatService {
  constructor(private seatRepository: ISeatRepository) {}

  async getSeats(): Promise<SeatEntity[]> {
    return await this.seatRepository.findAllSeats();
  }

  async createGivenNumberSeat(
    req: Request,
    res: Response
  ): Promise<{ status: string; message: string[] }> {
    var numSeats = parseInt(req.params.seat, 10);
    for (let index = 0; index < numSeats; index++) {
      await this.seatRepository.saveSeat();
    }

    return {
      status: 'OK',
      message: [`Seats are succesfully created`],
    };
  }

  async deletedSeat(seatId: number): Promise<Success> {
    return this.seatRepository.deleteSeat(seatId);
  }
}

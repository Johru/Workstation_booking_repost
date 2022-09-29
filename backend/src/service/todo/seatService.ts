import { SeatEntity, WorkstationEntity } from '../../db';
// import { ITodoRepository } from '../../repository';
import { ISeatRepository } from '../../repository';
import { Response, Request } from 'express';
// import { todoSchema } from './schema';
import { seatSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

export interface ISeatService {
  getSeats(): Promise<SeatEntity[]>;
  createSeat(seat: SeatEntity): Promise<{ status: string; message: string[] }>;
  createGivenNumberSeat(
    req: Request,
    res: Response
  ): Promise<{ status: string; message: string[] }>;
  deleteSeat(
    req: Request,
    res: Response
  ): Promise<{ status: string; message: string[] }>;
}

export class SeatService implements ISeatService {
  constructor(private seatRepository: ISeatRepository) {}

  // get all seats
  async getSeats(): Promise<SeatEntity[]> {
    return await this.seatRepository.findAllSeats();
  }

  // create single seat
  async createSeat(seat: SeatEntity): Promise<{ status: string; message: string[] }> {
    try {
      const value = await seatSchema.validateAsync(seat);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    const newSeat = await this.seatRepository.saveSeat(seat);

    return {
      status: 'OK',
      message: [`Seat is succesfully saved with id: ${newSeat.seat_id}`],
    };
  }

  // create multiple seat
  async createGivenNumberSeat(req: Request,res: Response): Promise<{ status: string; message: string[] }> {
    const seat: SeatEntity = req.body as SeatEntity;
    try {
      const value = await seatSchema.validateAsync(seat);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    var numSeats = parseInt(req.params.seat, 10);
    for (let index = 0; index < numSeats; index++) {
      const newSeat: SeatEntity = {
        workstation_id: seat.workstation_id,
      
      };
      await this.seatRepository.saveSeat(newSeat);
    }

    return {
      status: 'OK',
      message: [`Seats are succesfully created`],
    };
  }

  // delete single seat
  async deleteSeat(req: Request,res: Response): Promise<{ status: string; message: string[] }> {
    const seat: SeatEntity = req.body as SeatEntity;
    try {
      const value = await seatSchema.validateAsync(seat);
    } catch (error) {
      if (error instanceof ValidationError) {
        logger.error(error);
        const { details } = error;
        const errorMessage = details.map(ve => ve.message);
        return { status: 'Error', message: errorMessage };
      }
    }

    var id = parseInt(req.params.id, 10);
    await this.seatRepository.deleteSeat(id);

    return {
      status: 'OK',
      message: [`Seat is succesfully deleted`],
    };
  }
}

import { Seat } from '../../db';
// import { ITodoRepository } from '../../repository';
import { ISeatRepository } from '../../repository';
// import { todoSchema } from './schema';
import { seatSchema } from './schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

export interface ISeatService {
  getSeats(): Promise<Seat[]>;
  createSeat(seat: Seat): Promise<{ status: string; message: string[] }>;
}

export class SeatService implements ISeatService {
  constructor(private seatRepository: ISeatRepository) {}

  async getSeats(): Promise<Seat[]> {
    return await this.seatRepository.findAllSeats();
  }

  async createSeat(seat: Seat): Promise<{ status: string; message: string[] }> {
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
}

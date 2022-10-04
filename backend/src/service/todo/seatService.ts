import { SeatEntity, WorkstationEntity } from '../../db';
import { ISeatRepository, Success } from '../../repository';
import { Response, Request } from 'express';
import { seatSchema } from './Schema';
import { ValidationError } from 'joi';
import logger from '../../logger';

export interface ISeatService {
  getSeats(): Promise<SeatEntity[]>;
  createGivenNumberSeat(
    req: Request,
    res: Response
  ): Promise<{ status: string; message: string[] }>;
  deletedSeat(req: Request, res: Response): Promise<Success>;
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

  async deletedSeat(req: Request, res: Response): Promise<Success> {
    try {
      await this.seatRepository.deleteSeat(req, res);
      return { success: 'yes' };
    } catch (error) {
      return { success: 'no' };
    }
  }
}

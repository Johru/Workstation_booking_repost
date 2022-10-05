import { Success } from 'repository';
import { appDataSource } from '../db';
import { Response, Request } from 'express';
import { SeatEntity } from '../db';

export interface ISeatRepository {
  findAllSeats(): Promise<SeatEntity[]>;
  saveSeat(seat: SeatEntity): Promise<SeatEntity>;
  deleteSeat(seatId: number): Promise<Success>;
}

export class SeatRepository implements ISeatRepository {
  async findAllSeats(): Promise<SeatEntity[]> {
    return appDataSource.getRepository(SeatEntity).find();
  }

  async saveSeat(seat: SeatEntity): Promise<SeatEntity> {
    const seatToSave = new SeatEntity();
    seatToSave.workstation_id = seat.workstation_id;
    return appDataSource.getRepository(SeatEntity).save(seatToSave);
  }

  async deleteSeat(seatId: number): Promise<Success> {
    var seatRemove = await appDataSource
      .createQueryBuilder()
      .delete()
      .from(SeatEntity)
      .where('seat_id =:seatId', { seatId: seatId })
      .execute();

    if (seatRemove.affected == 0) {
      return { success: 'yes' };
    } else {
      return { success: 'no' };
    }
  }
}

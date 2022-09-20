import { appDataSource } from '../db';
import { Seat } from '../db';

export interface ISeatRepository {
  findAllSeats(): Promise<Seat[]>;
  saveSeat(seat: Seat): Promise<Seat>;
}

export class SeatRepository implements ISeatRepository {
  async findAllSeats(): Promise<Seat[]> {
    return appDataSource.getRepository(Seat).find();
  }

  saveSeat(seat: Seat): Promise<Seat> {
    const seatToSave = new Seat();
    seatToSave.workstation_id = seat.workstation_id;

    return appDataSource.getRepository(Seat).save(seatToSave);
  }
}

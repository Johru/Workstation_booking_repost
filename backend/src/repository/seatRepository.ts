import { appDataSource } from '../db';
import { Seat } from '../db';

export interface ISeatRepository {
  findAllSeats(): Promise<Seat[]>;
  saveSeat(seat: Seat): Promise<Seat>;
  deleteSeat (id: number): Promise<Seat[]>;
}

export class SeatRepository implements ISeatRepository {
  async findAllSeats(): Promise<Seat[]> {
    return appDataSource.getRepository(Seat).find();
  }

  async saveSeat(seat: Seat): Promise<Seat> {
    const seatToSave = new Seat();
    seatToSave.workstation_id = seat.workstation_id;

    return appDataSource.getRepository(Seat).save(seatToSave);
  }
  
  async deleteSeat(id: number): Promise<Seat[]> {
    var seatRemove = await appDataSource.getRepository(Seat).find({
      where: {
        seat_id: id,
      },
    });
    return appDataSource.getRepository(Seat).remove(seatRemove)
  }
 


}

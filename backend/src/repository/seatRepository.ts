import { appDataSource } from '../db';
import { SeatTable } from '../db';

export interface ISeatRepository {
  findAllSeats(): Promise<SeatTable[]>;
  saveSeat(seat: SeatTable): Promise<SeatTable>;
  deleteSeat(id: number): Promise<SeatTable[]>;
}

export class SeatRepository implements ISeatRepository {
  async findAllSeats(): Promise<SeatTable[]> {
    return appDataSource.getRepository(SeatTable).find();
  }

  async saveSeat(seat: SeatTable): Promise<SeatTable> {
    const seatToSave = new SeatTable();
    seatToSave.workstation_id = seat.workstation_id;
    return appDataSource.getRepository(SeatTable).save(seatToSave);
  }

  async deleteSeat(id: number): Promise<SeatTable[]> {
    var seatRemove = await appDataSource.getRepository(SeatTable).find({
      where: {
        seat_id: id,
      },
    });
    return appDataSource.getRepository(SeatTable).remove(seatRemove);
  }
}

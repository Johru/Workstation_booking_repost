import { appDataSource } from '../db';
import { SeatEntity } from '../db';

export interface ISeatRepository {
  findAllSeats(): Promise<SeatEntity[]>;
  saveSeat(seat: SeatEntity): Promise<SeatEntity>;
  deleteSeat(id: number): Promise<SeatEntity[]>;
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

  async deleteSeat(id: number): Promise<SeatEntity[]> {
    var seatRemove = await appDataSource.getRepository(SeatEntity).find({
      where: {
        seat_id: id,
      },
    });
    return appDataSource.getRepository(SeatEntity).remove(seatRemove);
  }
}

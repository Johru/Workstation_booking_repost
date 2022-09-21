import { ReservationTable } from '../db/models/reservation';
import { appDataSource, SeatTable } from '../db';

export class ReservationRepository {
  async bigJoin(body: any): Promise<ReservationTable[]> {
    const workstationId = body.workstationId;
    const resevationDate = body.reservationDate;
    return appDataSource
      .getRepository(SeatTable)
      .createQueryBuilder('seat')
      .leftJoin(
        'seat.reservation',
        'reservation',
        'reservation.reservation_date = :date',
        {
          date: resevationDate,
        }
      )
      .addSelect(['reservation.reservation_date'])
      .where('seat.workstation_id = :id', { id: workstationId })
      .leftJoin('reservation.user', 'user')
      .addSelect(['user.user_name'])
      .getMany();
  }
  async sendNewReservation(body: any): Promise<ReservationTable> {
    const resSave = new ReservationTable();
    resSave.user_id = body.userId;
    resSave.seat_id = body.seatId;
    resSave.reservation_date = body.reservationDate;

    return appDataSource.getRepository(ReservationTable).save(resSave);
  }
}

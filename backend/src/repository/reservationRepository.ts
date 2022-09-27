import { ReservationTable } from '../db/models/reservation';
import { appDataSource, SeatTable } from '../db';
import logger from '../logger';
import { Success } from './success';

export class ReservationRepository {
  async showReservationForDay(
    workstationId: number,
    reservationDate: string
  ): Promise<ReservationTable[]> {
    return appDataSource
      .getRepository(SeatTable)
      .createQueryBuilder('seat')
      .leftJoin(
        'seat.reservation',
        'reservation',
        'reservation.reservation_date = :date',
        {
          date: reservationDate,
        }
      )
      .addSelect(['reservation.reservation_date'])
      .where('seat.workstation_id = :id', { id: workstationId })
      .leftJoin('reservation.user', 'user')
      .addSelect(['user.user_name'])
      .getMany();
  }

  async displayReservationForUser(userId: number): Promise<ReservationTable[]> {
    return appDataSource
      .getRepository(ReservationTable)
      .createQueryBuilder('reservation')
      .where('reservation.user_id = :id', { id: userId })
      .getMany();
  }
  async addNewReservation(
    requestBody: ReservationTable
  ): Promise<ReservationTable> {
    const resSave = new ReservationTable();
    resSave.user_id = requestBody.user_id;
    resSave.seat_id = requestBody.seat_id;
    resSave.reservation_date = requestBody.reservation_date;

    return appDataSource.getRepository(ReservationTable).save(resSave);
  }

  async deleteReservation(body: number): Promise<Success> {
    const deletion = await appDataSource
      .createQueryBuilder()
      .delete()
      .from(ReservationTable)
      .where('reservation_id=:reservationId', {
        reservationId: body,
      })
      .execute();

    if (deletion.affected == 0) {
      return { success: 'no' };
    } else {
      return { success: 'yes' };
    }
  }
}

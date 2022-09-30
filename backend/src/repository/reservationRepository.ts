<<<<<<< HEAD
import { ReservationTable } from '../db/entity/reservation';
import { appDataSource, SeatTable } from '../db/index';
=======
import { appDataSource } from '../db';
import { Success } from './success';
import { ReservationEntity, SeatEntity } from '../db';
>>>>>>> 4226b1a64296bb5bfd38076fef0c8674c75a721a

interface IReservationRepository {
  showReservationForGivenDate(
    workstationId: number,
    reservationDate: string
  ): Promise<ReservationEntity[]>;
  displayReservationForUser(userId: number): Promise<ReservationEntity[]>;
  addNewReservation(requestBody: ReservationEntity): Promise<ReservationEntity>;
  deleteReservation(reservationId: number): Promise<Success>;
}

export class ReservationRepository implements IReservationRepository {
  async showReservationForGivenDate(
    workstationId: number,
    reservationDate: string
  ): Promise<ReservationEntity[]> {
    return appDataSource
      .getRepository(SeatEntity)
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

  async displayReservationForUser(
    userId: number
  ): Promise<ReservationEntity[]> {
    return appDataSource
      .getRepository(ReservationEntity)
      .createQueryBuilder('reservation')
<<<<<<< HEAD
      .where('reservation.user_id = :id', { id: body })
      .leftJoin('reservation.seat', 'seat')
      .addSelect(['seat.seat_id'])
=======
      .where('reservation.user_id = :id', { id: userId })
>>>>>>> 4226b1a64296bb5bfd38076fef0c8674c75a721a
      .getMany();
  }

  async addNewReservation(
    requestBody: ReservationEntity
  ): Promise<ReservationEntity> {
    const resSave = new ReservationEntity();
    resSave.user_id = requestBody.user_id;
    resSave.seat_id = requestBody.seat_id;
    resSave.reservation_date = requestBody.reservation_date;

    return appDataSource.getRepository(ReservationEntity).save(resSave);
  }

  async deleteReservation(reservationId: number): Promise<Success> {
    const deletion = await appDataSource
      .createQueryBuilder()
      .delete()
      .from(ReservationEntity)
      .where('reservation_id=:reservationId', {
        reservationId: reservationId,
      })
      .execute();

    if (deletion.affected == 0) {
      return { success: 'no' };
    } else {
      return { success: 'yes' };
    }
  }
}

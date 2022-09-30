import { appDataSource } from '../db';
import { Success } from './success';
import { ReservationEntity, SeatEntity } from '../db';
import { determineSuccess } from './determineSuccess';

export interface IReservationRepository {
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
      .where('reservation.user_id = :id', { id: userId })
      .leftJoin('reservation.seat', 'seat')
      .addSelect(['seat.seat_id'])
      .leftJoin('seat.workstation', 'workstation')
      .addSelect(['workstation.workstation_name'])
      .leftJoin('workstation.floor', 'floor')
      .addSelect(['floor.floor_name'])
      .leftJoin('floor.building', 'building')
      .addSelect(['building.building_name'])
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

    return determineSuccess(deletion);
  }
}

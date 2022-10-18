import logger from '../logger';
import { appDataSource } from '../db';
import { ReservationEntity, SeatEntity } from '../db';
import { logErrorAndReturnYesOrNo } from './logErrorAndReturnYesOrNo';
import { Success } from './success';

export interface IReservationRepository {
  showReservationForGivenDate(
    workstationId: number,
    reservationDate: string
  ): Promise<ReservationEntity[]>;
  showReservationForGivenUser(userId: number): Promise<ReservationEntity[]>;
  addNewReservation(requestBody: ReservationEntity): Promise<Success>;
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

  async showReservationForGivenUser(
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

  async addNewReservation(requestBody: ReservationEntity): Promise<Success> {
    const resSave = new ReservationEntity();
    resSave.user_id = requestBody.user_id;
    resSave.seat_id = requestBody.seat_id;
    resSave.reservation_date = requestBody.reservation_date;
    try {
      const addition = await appDataSource
        .getRepository(ReservationEntity)
        .save(resSave);
      const output = await appDataSource
        .getRepository(ReservationEntity)
        .createQueryBuilder('reservation')
        .where('reservation.reservation_id = :id', {
          id: addition.reservation_id,
        })
        .leftJoin('reservation.user', 'user')
        .addSelect(['user.user_name', 'user.user_email'])
        .leftJoin('reservation.seat', 'seat')
        .addSelect(['seat.seat_id'])
        .leftJoin('seat.workstation', 'workstation')
        .addSelect(['workstation.workstation_name'])
        .leftJoin('workstation.floor', 'floor')
        .addSelect(['floor.floor_name'])
        .leftJoin('floor.building', 'building')
        .addSelect([
          'building.building_name',
          'building.building_address',
          'building.building_city',
        ])
        .getMany();
      return logErrorAndReturnYesOrNo(addition, 'Reservation', output);
    } catch (error) {
      logger.error(error);
      return { success: 'no' };
    }
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

    return logErrorAndReturnYesOrNo(deletion, 'Reservation');
  }
}

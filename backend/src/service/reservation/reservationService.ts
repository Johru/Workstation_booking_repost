import { ReservationEntity } from '../../db';
import { ReservationRepository, Success } from '../../repository';
import { dateSchema, idSchema } from '../index';
import { reservationSchema } from './reservationSchema';
import { validateInput } from '../index';

export class ReservationService {
  constructor(public reservationRepository: ReservationRepository) {}

  async showReservationForGivenDate(
    workstationId: number,
    reservationDate: string
  ): Promise<ReservationEntity[]> {
    const validation = await validateInput(dateSchema, reservationDate);
    if (!validation) return [];

    return this.reservationRepository.showReservationForGivenDate(
      workstationId,
      reservationDate
    );
  }

  async addNewReservation(requestBody: ReservationEntity): Promise<Success> {
    const validation = await validateInput(reservationSchema, requestBody);
    if (!validation) return { success: 'no' };
    return this.reservationRepository.addNewReservation(requestBody);
  }

  async deleteReservation(id: number): Promise<Success> {
    const validation = await validateInput(idSchema, id);
    if (!validation) return { success: 'no' };

    return this.reservationRepository.deleteReservation(id);
  }

  showReservationForGivenUser(id: number): Promise<ReservationEntity[]> {
    return this.reservationRepository.showReservationForGivenUser(id);
  }
}

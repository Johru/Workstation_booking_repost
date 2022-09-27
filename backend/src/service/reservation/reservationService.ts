import { ValidationError } from 'joi';
import logger from '../../logger';

import { ReservationRepository } from '../../repository/reservationRepository';
import { ReservationTable } from '../../db/models/reservation';
import { Success } from '../../repository/success';

export class ReservationService {
  constructor(public reservationRepository: ReservationRepository) {}

  showReservationForDay(
    workstationId: number,
    reservationDate: string
  ): Promise<ReservationTable[]> {
    return this.reservationRepository.showReservationForDay(
      workstationId,
      reservationDate
    );
  }

  addNewReservation(requestBody: ReservationTable): Promise<ReservationTable> {
    return this.reservationRepository.addNewReservation(requestBody);
  }
  deleteReservation(reservationId: number): Promise<Success> {
    return this.reservationRepository.deleteReservation(reservationId);
  }
  displayReservationForUser(userId: number): Promise<ReservationTable[]> {
    return this.reservationRepository.displayReservationForUser(userId);
  }
}

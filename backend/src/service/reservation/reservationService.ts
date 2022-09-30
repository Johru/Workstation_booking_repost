<<<<<<< HEAD
import { ValidationError } from 'joi';
import logger from '../../logger';

import { ReservationRepository } from '../../repository/reservationRepository';
import { ReservationTable } from '../../db/entity/reservation';
=======
import { ReservationEntity } from '../../db';
import { ReservationRepository, Success } from '../../repository';
>>>>>>> 4226b1a64296bb5bfd38076fef0c8674c75a721a

export class ReservationService {
  constructor(public reservationRepository: ReservationRepository) {}

  showReservationForGivenDate(
    workstationId: number,
    reservationDate: string
  ): Promise<ReservationEntity[]> {
    return this.reservationRepository.showReservationForGivenDate(
      workstationId,
      reservationDate
    );
  }

  addNewReservation(
    requestBody: ReservationEntity
  ): Promise<ReservationEntity> {
    return this.reservationRepository.addNewReservation(requestBody);
  }

  deleteReservation(reservationId: number): Promise<Success> {
    return this.reservationRepository.deleteReservation(reservationId);
  }

  displayReservationForUser(userId: number): Promise<ReservationEntity[]> {
    return this.reservationRepository.displayReservationForUser(userId);
  }
}

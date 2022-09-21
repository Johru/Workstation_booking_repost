import { ValidationError } from 'joi';
import logger from '../../logger';

import { ReservationRepository } from '../../repository/reservationRepository';
import { ReservationTable } from '../../db/models/reservation';

export class ReservationService {
  constructor(public reservationRepository: ReservationRepository) {}

  showReservationForDay(body: any): Promise<ReservationTable[]> {
    return this.reservationRepository.bigJoin(body);
  }

  addNewReservation(body: any): Promise<ReservationTable> {
    return this.reservationRepository.sendNewReservation(body);
  }
}

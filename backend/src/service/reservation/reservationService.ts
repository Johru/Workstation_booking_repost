import { ValidationError } from 'joi';
import logger from '../../logger';

import { ReservationRepository } from '../../repository/reservationRepository';
import { ReservationTable } from '../../db/models/reservation';

export class ReservationService {
  constructor(public reservationRepository: ReservationRepository) {}

  showReservationForDay(
    workstationId: number,
    reservationDate: string
  ): Promise<ReservationTable[]> {
    console.log('service: ' + workstationId + '/' + reservationDate);
    return this.reservationRepository.bigJoin(workstationId, reservationDate);
  }

  addNewReservation(body: any): Promise<ReservationTable> {
    return this.reservationRepository.sendNewReservation(body);
  }
  deleteReservation(body: any): Promise<any> {
    return this.reservationRepository.deleteReservation(body);
  }
}

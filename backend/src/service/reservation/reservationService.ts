import { ReservationEntity } from '../../db/index';
import { ReservationRepository, Success } from '../../repository/index';

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

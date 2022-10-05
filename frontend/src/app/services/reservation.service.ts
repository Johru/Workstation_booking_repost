import { Injectable } from '@angular/core';
import { Reservation } from '../helpingHand/reservation';
import { RESERVATIONS } from '../helpingHand/reservation-data';

@Injectable({
  providedIn: 'root',
})
export class ReservationService {
  constructor() {}

  addReservation(resData: Reservation): void {
    RESERVATIONS.push(resData);
  }

  deleteReservation(resId: number) {
    const message = {
      success: 'yes',
    };
    return message;
  }
}

import { Injectable } from '@angular/core';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';
import { Reservation } from '../helpingHand/reservation';
import { RESERVATIONS } from '../helpingHand/reservation-data';
import { Seat } from '../helpingHand/seat';
import { SEATS } from '../helpingHand/seat-data';
import { WORKSTATIONLIST } from '../helpingHand/workstation-data';

@Injectable({
  providedIn: 'root',
})
export class WorkstationService {
  constructor() {}

  getWorkstations(): IWorkstation[] {
    return WORKSTATIONLIST;
  }

  getSeats(): Seat[] {
    return SEATS;
  }

  addReservation(resData: Reservation): void {
    RESERVATIONS.push(resData);
  }
}

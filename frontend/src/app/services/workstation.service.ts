import { Injectable } from '@angular/core';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';
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
}

import { Injectable } from '@angular/core';
import { ADMINRESERVATIONLIST } from '../helpingHand/admin-reservation';
import { USERS } from '../helpingHand/user-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsers() {
    return USERS;
  }

  getReservations() {
    return ADMINRESERVATIONLIST;
  }
}

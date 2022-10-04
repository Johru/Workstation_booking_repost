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

  //userId on these methods is not used but needed to make a req to BE
  promoteUserToAdmin(userId: number) {
    const message = {
      success: 'yes',
    };
    return message;
  }

  demoteUserFromAdmin(userId: number) {
    const message = {
      success: 'yes',
    };
    return message;
  }

  blockUser(userId: number) {
    const message = {
      success: 'yes',
    };
    return message;
  }

  unBlockUser(userId: number) {
    const message = {
      success: 'yes',
    };
    return message;
  }

  deleteUser(userId: number) {
    const message = {
      success: 'yes',
    };
    return message;
  }
}

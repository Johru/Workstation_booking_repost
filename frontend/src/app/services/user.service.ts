import { Injectable } from '@angular/core';
import { USERS } from '../helpingHand/user-data';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor() {}

  getUsers() {
    return USERS;
  }
}

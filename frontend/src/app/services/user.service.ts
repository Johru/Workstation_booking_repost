import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../helpingHand/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User> {
    return this.http.get<User>(environment.rootPath + `/api/user`);
  }

  getReservations(userId: number) {
    return this.http.get<User>(
      environment.rootPath + `/api/reservation/user/${userId}`
    );
  }

  promoteUserToAdmin(userId: number) {
    return this.http.patch<any>(
      environment.rootPath + `/api/user/${userId}/promote`,
      {}
    );
  }

  demoteUserFromAdmin(userId: number) {
    return this.http.patch<any>(
      environment.rootPath + `/api/user/${userId}/demote`,
      {}
    );
  }

  blockUser(userId: number) {
    return this.http.patch<any>(
      environment.rootPath + `/api/user/${userId}/block`,
      {}
    );
  }

  unBlockUser(userId: number) {
    return this.http.patch<any>(
      environment.rootPath + `/api/user/${userId}/unblock`,
      {}
    );
  }

  deleteUser(userId: number) {
    return this.http.delete<any>(
      environment.rootPath + `/api/user/${userId}/delete`
    );
  }
}

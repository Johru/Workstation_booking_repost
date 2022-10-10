import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Login } from '../helpingHand/login';
import { Register } from '../helpingHand/register';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logIn = new Subject();

  constructor(private http: HttpClient) {}

  register(user: Register): Observable<Register> {
    let obs = this.http.post<Register>(
      environment.rootPath + '/auth/registration',
      user
    );
    return obs;
  }

  loginByMail(user: Login): Observable<Login> {
    let obs = this.http.post<Login>(
      environment.rootPath + '/auth/login-email',
      user
    );
    return obs;
  }

  loginByLogin(user: Login) {
    let obs = this.http.post<Login>(
      environment.rootPath + '/auth/login-login',
      user
    );
    return obs;
  }

  loginSubscription() {
    return this.logIn.asObservable();
  }
}

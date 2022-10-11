import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Login } from '../helpingHand/login';
import { Register } from '../helpingHand/register';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logIn = new Subject();
  jwtHelper = new JwtHelperService();

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

  isAuthenticated(): boolean {
    let token: string | null | undefined = localStorage.getItem('token');
    if (token == null) {
      return false;
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');
    }
    return !this.jwtHelper.isTokenExpired(token);
  }
}

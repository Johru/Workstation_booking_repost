import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Login, TokenResponse } from '../helpingHand/login';
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
    return this.http.post<Register>(
      environment.rootPath + '/auth/registration',
      user
    );
  }

  loginByMail(user: Login): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      environment.rootPath + '/auth/login-email',
      user
    );
  }

  loginByLogin(user: Login): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      environment.rootPath + '/auth/login-login',
      user
    );
  }

  loginSubscription() {
    return this.logIn.asObservable();
  }

  isAuthenticated(): boolean {
    const token: string | null | undefined = localStorage.getItem('token');
    if (token == null) {
      return false;
    }
    if (this.jwtHelper.isTokenExpired(token)) {
      localStorage.removeItem('token');
    }
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    return localStorage.getItem('token');
  }
}

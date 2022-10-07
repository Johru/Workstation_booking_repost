import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Register } from '../helpingHand/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  register(user: Register): Observable<Register> {
    let obs = this.http.post<Register>(
      'http://localhost:8080/auth/registration',
      user
    );
    return obs;
  }
}

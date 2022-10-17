import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import decode from 'jwt-decode';
import { TokenResponse } from '../helpingHand/login';

@Injectable({
  providedIn: 'root',
})
export class RoleGuardService {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = true;
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/login']);
      return false;
    }
    const decodedToken = decode(token) as TokenResponse;
    if (this.auth.isAuthenticated() && decodedToken.isAdmin !== expectedRole) {
      this.router.navigate(['']);
      return false;
    }
    if (!this.auth.isAuthenticated() || decodedToken.isAdmin !== expectedRole) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}

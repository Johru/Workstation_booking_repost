import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navpanel',
  templateUrl: './navpanel.component.html',
  styleUrls: ['./navpanel.component.css'],
})
export class NavpanelComponent implements OnInit, OnDestroy, OnChanges {
  loggedIn?: boolean;
  isAdmin?: boolean;
  loginSubscription?: Subscription;
  isAdminSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loggedIn = this.authService.isAuthenticated();
    this.loginSubscription = this.authService
      .loginSubscription()
      .subscribe(() => {
        this.loggedIn = true;
      });
    this.isAdmin = this.authService.isAdmin();
    this.isAdminSubscription = this.authService
      .isAdminSubscription()
      .subscribe(() => {
        if (this.authService.isAdmin()) {
          this.isAdmin = true;
          return;
        }
        this.isAdmin = false;
      });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
    this.isAdminSubscription?.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.isAdmin = this.authService.isAdmin();
  }

  logOut() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['']);
  }
}

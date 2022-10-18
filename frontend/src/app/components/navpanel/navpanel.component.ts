import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'navpanel',
  templateUrl: './navpanel.component.html',
  styleUrls: ['./navpanel.component.css'],
})
export class NavpanelComponent implements OnInit, OnDestroy {
  loggedIn?: boolean;
  loginSubscription?: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loggedIn = this.authService.isAuthenticated();
    this.loginSubscription = this.authService
      .loginSubscription()
      .subscribe(() => {
        this.loggedIn = true;
      });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  logOut() {
    localStorage.removeItem('token');
    this.loggedIn = false;
    this.router.navigate(['']);
  }
}

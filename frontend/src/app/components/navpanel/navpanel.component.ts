import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loggedIn = this.isAnybodyOutThere();
    this.loginSubscription = this.authService
      .loginSubscription()
      .subscribe(() => {
        this.loggedIn = true;
      });
  }

  ngOnDestroy(): void {
    this.loginSubscription?.unsubscribe();
  }

  isAnybodyOutThere() {
    if (this.authService.isAuthenticated()) return true;
    return false;
  }

  logOut() {
    localStorage.removeItem('token');
    this.loggedIn = false;
  }
}

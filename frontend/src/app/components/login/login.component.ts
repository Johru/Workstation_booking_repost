import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Login, TokenResponse } from 'src/app/helpingHand/login';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  show: boolean = false;
  visibility: string = 'password-hidden';
  attribute: string = 'password';
  invalidInput: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  toogle() {
    this.show = !this.show;
    this.show ? (this.attribute = 'text') : (this.attribute = 'password');
    this.show
      ? (this.visibility = 'password-visible')
      : (this.visibility = 'password-hidden');
  }

  signIn(form: NgForm) {
    let emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (form.value.email.match(emailRegex)) {
      let user: Login = {
        user_email: form.value.email,
        user_password: form.value.password,
      };
      this.signInByMail(user);
    } else {
      let user: Login = {
        user_login: form.value.email,
        user_password: form.value.password,
      };
      this.signInByLogin(user);
    }
  }

  signInByMail(user: Login) {
    let response: Observable<TokenResponse> = this.authService.loginByMail(
      user
    ) as unknown as Observable<TokenResponse>;
    this.handleResponse(response);
  }

  signInByLogin(user: Login) {
    let response: Observable<TokenResponse> = this.authService.loginByLogin(
      user
    ) as unknown as Observable<TokenResponse>;
    this.handleResponse(response);
  }

  handleResponse(response: Observable<TokenResponse>) {
    response.subscribe({
      next: (data) => {
        if (data.error) {
          this.invalidInput = true;
        } else {
          this.invalidInput = false;
          localStorage.setItem('userId', `${data.user_id}`);
          localStorage.setItem('token', data.token);
          localStorage.setItem('isAdmin', data.isAdmin);
          this.rerouteHome();
          this.authService.logIn.next(true);
        }
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  rerouteHome() {
    this.router.navigate(['']);
  }
}

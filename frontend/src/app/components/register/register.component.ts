import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  show: boolean = false;
  visibility: string = 'password-hidden';
  attribute: string = 'password';
  submitted: boolean = false;

  constructor(private authService: AuthService) {}

  onSubmit(form: NgForm) {
    this.submitted = true;
    let fullName = form.value.firstName + ' ' + form.value.lastName;
    let user = {
      user_name: fullName,
      user_login: form.value.ulogin,
      user_password: form.value.password,
      user_email: form.value.email,
    };
    let response = this.authService.register(user);
    response.subscribe((data) => {
      console.log(data);
    });
  }

  toogle() {
    this.show = !this.show;
    this.show ? (this.attribute = 'text') : (this.attribute = 'password');
    this.show
      ? (this.visibility = 'password-visible')
      : (this.visibility = 'password-hidden');
  }
}

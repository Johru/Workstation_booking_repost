import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

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

  constructor() {}

  onSubmit(form: NgForm) {
    this.submitted = true;
    let fullName = form.value.firstName + ' ' + form.value.lastName;
  }

  toogle() {
    this.show = !this.show;
    this.show ? (this.attribute = 'text') : (this.attribute = 'password');
    this.show
      ? (this.visibility = 'password-visible')
      : (this.visibility = 'password-hidden');
  }
}

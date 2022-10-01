import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  submitted = false;
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    this.submitted = true;
    let fullName = form.value.firstName + ' ' + form.value.lastName;
    let url = 'http://localhost:3022/api/users';
    this.http
      .post(url, {
        fullName: fullName,
        email: form.value.email,
        ulogin: form.value.ulogin,
        password: form.value.password,
      })

      .subscribe((res) => console.log(res));
  }
}

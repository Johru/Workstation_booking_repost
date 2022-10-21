import { Component, OnInit } from '@angular/core';
import decode from 'jwt-decode';
import { TokenResponse } from 'src/app/helpingHand/login';

@Component({
  selector: 'my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.css'],
})
export class MyBookingsComponent implements OnInit {
  userId!: number;

  ngOnInit(): void {
    this.getUserId();
  }

  getUserId() {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = decode(token!) as TokenResponse;
      const id = decodedToken.id;
      this.userId = id;
    } else {
      this.userId = 0;
    }
  }
}

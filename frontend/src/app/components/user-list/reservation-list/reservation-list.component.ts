import { Component, OnInit } from '@angular/core';
import { AdminReservation } from 'src/app/helpingHand/admin-reservation';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  reservationList?: AdminReservation[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getReservationList();
  }

  getReservationList() {
    this.reservationList = this.userService.getReservations();
  }
}

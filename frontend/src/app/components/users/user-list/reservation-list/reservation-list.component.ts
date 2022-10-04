import { Component, OnInit } from '@angular/core';
import { AdminReservation } from 'src/app/helpingHand/admin-reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  reservationList?: AdminReservation[];
  confirmDelete: boolean = false;
  selectedReservation!: number;

  constructor(
    private userService: UserService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.getReservationList();
  }

  getReservationList() {
    this.reservationList = this.userService.getReservations();
  }

  deleteReservation(id: number) {
    let result = this.reservationService.deleteReservation(id);
    if (result.success == 'yes') {
      this.toggleDeleteModal();
      this.reservationList = this.reservationList?.filter(
        (res) => res.id != id
      );
      return;
    }
    alert('Something is wrong, deletion of reservation was unsuccessfull.');
    this.toggleDeleteModal();
  }

  toggleDeleteModal() {
    this.confirmDelete = !this.confirmDelete;
  }

  setTheReservationId(id: number) {
    this.selectedReservation = id;
  }
}

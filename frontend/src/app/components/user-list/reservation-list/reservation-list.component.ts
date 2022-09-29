import { Component, OnInit } from '@angular/core';
import { AdminReservation } from 'src/app/helpingHand/admin-reservation';
import { UserService } from 'src/app/services/user.service';
import { WorkstationService } from 'src/app/services/workstation.service';

@Component({
  selector: 'reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  reservationList?: AdminReservation[];
  successfullDelete: boolean = false;

  constructor(
    private userService: UserService,
    private reservationService: WorkstationService
  ) {}

  ngOnInit(): void {
    this.getReservationList();
  }

  getReservationList() {
    this.reservationList = this.userService.getReservations();
  }

  deleteReservation(e: Event) {
    let targetElement = e.target as HTMLInputElement;
    let reservationId = parseInt(targetElement.value);
    let result = this.reservationService.deleteReservation(reservationId);
    if (result.success == 'yes') {
      this.toggleDeleteModal();
      this.reservationList = this.reservationList?.filter(
        (res) => res.id != reservationId
      );
      return;
    }
    alert('Something is wrong, deletion of reservation was unsuccessfull.');
    this.toggleDeleteModal();
  }

  toggleDeleteModal() {
    this.successfullDelete = !this.successfullDelete;
  }
}

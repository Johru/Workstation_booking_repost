import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { AdminReservation } from 'src/app/helpingHand/admin-reservation';
import { ReservationService } from 'src/app/services/reservation.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'reservation-list',
  templateUrl: './reservation-list.component.html',
  styleUrls: ['./reservation-list.component.css'],
})
export class ReservationListComponent implements OnInit {
  @Input() userId!: number;
  reservationList?: AdminReservation[] = [];
  confirmDelete: boolean = false;
  selectedReservation!: number;

  constructor(
    private userService: UserService,
    private reservationService: ReservationService
  ) {}

  ngOnInit(): void {
    this.pushReservationsToLocalArray();
  }

  pushReservationsToLocalArray() {
    this.getReservationList().subscribe((data) => {
      for (let item of data) {
        let reservation = {
          reservation_id: item.reservation_id,
          user_id: item.user_id,
          seat_id: item.seat_id,
          reservation_date: item.reservation_date,
          workstation_name: item.seat.workstation.workstation_name,
          floor_name: item.seat.workstation.floor.floor_name,
          building_name: item.seat.workstation.floor.building.building_name,
          building_address:
            item.seat.workstation.floor.building.building_address,
        };
        this.reservationList?.push(reservation);
      }
    });
  }

  getReservationList(): Observable<any> {
    return this.userService.getReservations(this.userId);
  }

  deleteReservation(id: number) {
    let result = this.reservationService.deleteReservation(id);
    if (result.success == 'yes') {
      this.toggleDeleteModal();
      this.reservationList = this.reservationList?.filter(
        (res) => res.reservation_id != id
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

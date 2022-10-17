import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservation } from 'src/app/helpingHand/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  @Input() resData: any;
  @Output() editEmitter = new EventEmitter<boolean>();
  @Output() cancelEmitter = new EventEmitter<boolean>();
  @Output() confirmEmitter = new EventEmitter<boolean>();
  edit: boolean = true;
  cancel: boolean = true;
  confirm: boolean = true;
  reservation?: Reservation = { user_id: 0, seat_id: 0, reservation_date: '' };

  constructor(private reservationService: ReservationService) {}

  editReservation() {
    this.editEmitter.emit(this.edit);
  }

  confirmReservation() {
    this.reservation!.user_id = this.resData.user_id;
    this.reservation!.seat_id = this.resData.seat_id;
    this.reservation!.reservation_date = this.resData.reservation_date;
    this.reservationService
      .addReservation(this.reservation!)
      .subscribe((data) => {});
    this.confirmEmitter.emit(this.confirm);
    this.confirm = !this.confirm;
  }

  cancelReservation() {
    this.cancelEmitter.emit(this.cancel);
  }
}

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
  reservation?: Reservation = { seat_id: 0, res_date: '', user_id: 0 };

  constructor(private reservationService: ReservationService) {}

  editReservation() {
    this.editEmitter.emit(this.edit);
  }

  confirmReservation() {
    this.reservation!.seat_id = this.resData.seat_id;
    this.reservation!.res_date = this.resData.res_date;
    this.reservation!.user_id = this.resData.user_id;
    this.reservationService.addReservation(this.reservation!);
    this.confirmEmitter.emit(this.confirm);
  }

  cancelReservation() {
    this.cancelEmitter.emit(this.cancel);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Reservation } from 'src/app/helpingHand/reservation';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
})
export class ConfirmModalComponent {
  @Input() resData?: Reservation;
  @Input() selectedWorkstation?: number;
  @Output() editEmitter = new EventEmitter<boolean>();
  @Output() cancelEmitter = new EventEmitter<boolean>();
  @Output() confirmEmitter = new EventEmitter<boolean[]>();
  edit = true;
  cancel = true;
  confirm = true;
  success = false;
  reservation?: Reservation = { user_id: 0, seat_id: 0, reservation_date: '' };

  constructor(private reservationService: ReservationService) {}

  editReservation() {
    this.editEmitter.emit(this.edit);
  }

  confirmReservation() {
    this.reservation = this.resData;
    this.reservationService
      .addReservation(this.reservation!)
      .subscribe(data => {
        if (data.success === 'yes') this.success = true;
        else this.success = false;

        this.confirmEmitter.emit([this.confirm, this.success]);
        this.confirm = !this.confirm;
      });
  }

  cancelReservation() {
    this.cancelEmitter.emit(this.cancel);
  }
}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/helpingHand/user';

@Component({
  selector: 'delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css'],
})
export class DeleteModalComponent {
  @Input() user?: User;
  @Input() reservation!: number;
  @Output() deleteUserEmitter = new EventEmitter<number>();
  @Output() deleteReservationEmitter = new EventEmitter<number>();
  @Output() toggleModalEmitter = new EventEmitter<boolean>();
  constructor() {}
  delete(user_id: number) {
    if (this.reservation == undefined) {
      this.deleteUserEmitter.emit(user_id);
      return;
    }
    this.deleteReservationEmitter.emit(user_id);
  }
  toggleDeleteModal() {
    this.toggleModalEmitter.emit(true);
  }
  setTheHeader() {
    if (this.user == undefined) {
      return `reservation user_id: ${this.reservation}`;
    }
    return `user ${this.user.user_name}`;
  }
  setTheInfo() {
    if (this.user == undefined) {
      return `reservation with user_id: ${this.reservation}`;
    }
    return `user ${this.user.user_name} / ${this.user.user_login}`;
  }
  setTheId(): number {
    let user_id: number;
    if (this.user == undefined) {
      user_id = this.reservation;
    } else {
      user_id = this.user.user_id;
    }
    return user_id;
  }
}

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

  delete(id: number) {
    if (this.reservation == undefined) {
      this.deleteUserEmitter!.emit(id);
      return;
    }
    this.deleteReservationEmitter.emit(id);
  }

  toggleDeleteModal() {
    this.toggleModalEmitter.emit(true);
  }

  header() {
    if (this.user == undefined) {
      return `reservation id: ${this.reservation}`;
    }
    return `user ${this.user.user_name}`;
  }

  info() {
    if (this.user == undefined) {
      return `reservation with id: ${this.reservation}`;
    }
    return `user ${this.user.user_name} / ${this.user.user_login}`;
  }

  setTheId(): number {
    let id: number;
    if (this.user == undefined) {
      id = this.reservation;
    } else {
      id = this.user.id;
    }
    return id;
  }
}

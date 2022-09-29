import { Component, EventEmitter, Input, Output } from '@angular/core';
import { User } from 'src/app/helpingHand/user';

@Component({
  selector: 'user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  @Input() userList?: User[];
  @Output() deleteUserEmitter = new EventEmitter<number>();

  constructor() {}

  onDeleteUser(e: number) {
    this.deleteUserEmitter.emit(e);
  }
}

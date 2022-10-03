import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/helpingHand/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userList?: User[];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.getUserList();
  }

  getUserList() {
    this.userList = this.userService.getUsers();
  }

  onDeleteUser(id: number) {
    let result = this.userService.deleteUser(id);
    if (result.success == 'yes') {
      this.userList = this.userList?.filter((user) => user.id != id);
      return;
    }
    alert('Something is wrong, deletion of user was unsuccessfull.');
  }
}

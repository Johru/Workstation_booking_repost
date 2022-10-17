import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/helpingHand/user';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  userList?: User[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.pushUsersToLocalArray();
  }

  pushUsersToLocalArray() {
    this.getUserList().subscribe((data) => {
      for (let item of data) {
        this.userList?.push(item);
      }
    });
  }

  getUserList(): Observable<any> {
    return this.userService.getUsers();
  }

  onDeleteUser(id: number) {
    this.userService.deleteUser(id).subscribe((data) => {
      if (data.success == 'yes') {
        this.userList = this.userList?.filter((user) => user.user_id != id);
        return;
      }
      alert('Something is wrong, deletion of user was unsuccessfull.');
    });
  }
}

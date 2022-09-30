import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from 'src/app/helpingHand/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css'],
  animations: [
    trigger('collapse', [
      state('*', style({ height: AUTO_STYLE })),
      state('void', style({ height: '0px' })),
      transition('void => *', animate(300 + 'ms ease-in')),
      transition('* => void', animate(300 + 'ms ease-out')),
    ]),
  ],
})
export class UserTabComponent implements OnInit {
  @Input() user!: User;
  @Output() deleteUserEmitter = new EventEmitter<number>();
  color: string = 'primary';
  blockTitle?: string;
  promoteTitle?: string;
  displayUserInfo: boolean = false;
  iconClass: string = 'material-icons';
  displayUserReservations: boolean = false;
  isCollapsed: string = 'close';
  confirmDelete: boolean = false;
  isBlocked?: boolean;
  isAdmin?: boolean;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isBlocked = this.user.user_isBlocked;
    this.isAdmin = this.user.user_isAdmin;
    this.setTheBlockTitle();
    this.setThePromoteTitle();
  }

  toggleInfo(e: Event) {
    this.displayUserInfo = !this.displayUserInfo;
    this.rotateIcon(e, this.displayUserInfo);
    if (this.displayUserReservations) {
      this.toggleReservations(e);
    }
  }

  setTheBlockTitle() {
    if (this.user.user_isBlocked) {
      this.blockTitle = 'Unblock User';
      return;
    } else {
      this.blockTitle = 'Block User';
    }
  }

  setThePromoteTitle() {
    if (this.user.user_isAdmin) {
      this.promoteTitle = 'Demote User from Admin';
      return;
    } else {
      this.promoteTitle = 'Promote User to Admin';
    }
  }

  toggleReservations(e: Event) {
    this.displayUserReservations = !this.displayUserReservations;
    this.rotateIcon(e, this.displayUserReservations);
  }

  rotateIcon(e: Event, displayValue: boolean) {
    let target = e.target as HTMLElement;
    if (!displayValue) {
      target.style.transform = 'rotate(180deg)';
    } else {
      target.style.transform = '';
    }
  }

  toggleDeleteModal() {
    this.confirmDelete = !this.confirmDelete;
  }

  onDeleteUser(id: number) {
    this.deleteUserEmitter.emit(id);
  }

  onCancelModal(e: boolean) {
    if (e) {
      this.toggleDeleteModal();
    }
  }

  //BE has two different endpoints for block(block,ublock),
  //first switch/case is for block/unblock
  //second for successfull response or error
  blockUnblockUser() {
    switch (this.isBlocked) {
      case true:
        let unblockResult = this.userService.unBlockUser(this.user.id);
        switch (unblockResult.success) {
          case 'yes':
            this.user.user_isBlocked = !this.user.user_isBlocked;
            this.isBlocked = !this.user.user_isBlocked;
            //leaving the console log for easier testing, for now
            console.log(`User ${this.user.user_name} unblocked`);
            break;
          case 'no':
            this.isBlocked = !this.user.user_isBlocked;
            alert('Something is wrong user was not unblocked.');
            break;
        }
        return;
      case false:
        let blockResult = this.userService.blockUser(this.user.id);
        switch (blockResult.success) {
          case 'yes':
            this.user.user_isBlocked = !this.user.user_isBlocked;
            this.isBlocked = !this.user.user_isBlocked;
            //leaving the console log for easier testing, for now
            console.log(`User ${this.user.user_name} blocked`);
            break;
          case 'no':
            this.isBlocked = !this.user.user_isBlocked;
            alert('Something is wrong user was not blocked.');
            break;
        }
        return;
    }
  }

  promoteDemoteUser() {
    switch (this.isAdmin) {
      case true:
        let demoteResult = this.userService.demoteUserFromAdmin(this.user.id);
        switch (demoteResult.success) {
          case 'yes':
            this.user.user_isAdmin = !this.user.user_isAdmin;
            this.isAdmin = !this.user.user_isAdmin;
            //leaving the console log for easier testing, for now
            console.log(`User ${this.user.user_name} demoted from Admin`);
            break;
          case 'no':
            this.isAdmin = !this.user.user_isAdmin;
            alert('Something is wrong user was not demoted.');
            break;
        }
        return;
      case false:
        let promoteResult = this.userService.promoteUserToAdmin(this.user.id);
        switch (promoteResult.success) {
          case 'yes':
            this.user.user_isAdmin = !this.user.user_isAdmin;
            this.isAdmin = !this.user.user_isAdmin;
            //leaving the console log for easier testing, for now
            console.log(`User ${this.user.user_name} promoted to Admin`);
            break;
          case 'no':
            this.isAdmin = !this.user.user_isAdmin;
            alert('Something is wrong user was not promoted.');
            break;
        }
        return;
    }
  }
}

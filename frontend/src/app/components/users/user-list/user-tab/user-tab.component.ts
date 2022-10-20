import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AdminReservation } from 'src/app/helpingHand/admin-reservation';
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
  color = 'warn';
  blockTitle?: string;
  promoteTitle?: string;
  displayUserInfo = false;
  iconClass = 'material-icons';
  displayUserReservations = false;
  isCollapsed = 'close';
  confirmDelete = false;
  isBlocked?: boolean;
  isAdmin?: boolean;
  reservationList: AdminReservation[] = [];

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.isBlocked = this.user.user_isblocked;
    this.isAdmin = this.user.user_isadmin;
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
    if (this.user.user_isblocked) {
      this.blockTitle = 'Unblock User';
      return;
    } else {
      this.blockTitle = 'Block User';
    }
  }

  setThePromoteTitle() {
    if (this.user.user_isadmin) {
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
    const target = e.target as HTMLElement;
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
    if (this.isBlocked) {
      this.userService.unBlockUser(this.user.user_id).subscribe(data => {
        this.resolveBlockUnblockUser(data.success, 'unblocked');
      });
      return;
    } else {
      this.userService.blockUser(this.user.user_id).subscribe(data => {
        this.resolveBlockUnblockUser(data.success, 'blocked');
      });
    }
  }

  resolveBlockUnblockUser(switchBlockResult: string, status: string) {
    switch (switchBlockResult) {
      case 'yes':
        this.isBlocked = !this.user.user_isblocked;
        this.user.user_isblocked = !this.user.user_isblocked;
        this.setTheBlockTitle();
        break;
      case 'no':
        this.isBlocked = !this.user.user_isblocked;
        this.setTheBlockTitle();
        alert(`Something is wrong user was not ${status}.`);
        break;
    }
  }

  promoteDemoteUser() {
    if (this.isAdmin) {
      this.userService
        .demoteUserFromAdmin(this.user.user_id)
        .subscribe(data => {
          this.resolvePromoteDemoteUser(data.success, 'demoted');
          return;
        });
    } else {
      const promoteResult = this.userService
        .promoteUserToAdmin(this.user.user_id)
        .subscribe(data => {
          this.resolvePromoteDemoteUser(data.success, 'promoted');
        });
    }
  }

  resolvePromoteDemoteUser(switchPromoteResult: string, status: string) {
    switch (switchPromoteResult) {
      case 'yes':
        this.isAdmin = !this.user.user_isadmin;
        this.user.user_isadmin = !this.user.user_isadmin;
        this.setThePromoteTitle();
        break;
      case 'no':
        this.isAdmin = !this.user.user_isadmin;
        this.setThePromoteTitle();
        alert(`Something is wrong user was not ${status}.`);
        break;
    }
  }
}

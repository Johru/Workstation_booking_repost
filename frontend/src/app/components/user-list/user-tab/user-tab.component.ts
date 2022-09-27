import {
  animate,
  AUTO_STYLE,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/helpingHand/user';

@Component({
  selector: 'user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css'],
  animations: [
    trigger('collapse', [
      state('true', style({ height: AUTO_STYLE, visibility: AUTO_STYLE })),
      state('false', style({ height: '0', visibility: 'hidden' })),
      transition('false => true', animate(500 + 'ms ease-in')),
      transition('true => false', animate(500 + 'ms ease-out')),
    ]),
  ],
})
export class UserTabComponent implements OnInit {
  @Input() user!: User;
  color: string = 'primary';
  blockTitle?: string = 'Block / Unblock User';
  displayUserInfo: boolean = false;
  iconClass: string = 'material-icons';
  displayUserReservations: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  toggleInfo(e: Event) {
    this.displayUserInfo = !this.displayUserInfo;
    this.rotateIcon(e, this.displayUserInfo);
    console.log(this.displayUserInfo);
  }

  toggleReservations(e: Event) {
    this.displayUserReservations = !this.displayUserReservations;
    this.rotateIcon(e, this.displayUserReservations);
    console.log(this.displayUserReservations);
  }

  rotateIcon(e: Event, displayValue: boolean) {
    let target = e.target as HTMLElement;
    if (!displayValue) {
      target.style.transform = 'rotate(180deg)';
    } else {
      target.style.transform = '';
    }
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/helpingHand/user';

@Component({
  selector: 'user-tab',
  templateUrl: './user-tab.component.html',
  styleUrls: ['./user-tab.component.css'],
})
export class UserTabComponent implements OnInit {
  @Input() user!: User;

  constructor() {}

  ngOnInit(): void {}
}

import { Component, OnInit, Input } from '@angular/core';
import { Floor } from 'src/app/help-files/floor-interface';

@Component({
  selector: 'user-floor-list',
  templateUrl: './user-floor-list.component.html',
  styleUrls: ['./user-floor-list.component.css'],
})
export class UserFloorListComponent implements OnInit {
  @Input() floor!: Floor;
  panelOpenState?: boolean;
  allSeats?: number;

  constructor() {}

  ngOnInit(): void {}

  toggleExpand() {
    this.panelOpenState = !this.panelOpenState;
  }
}

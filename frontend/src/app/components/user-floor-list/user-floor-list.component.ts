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

  ngOnInit(): void {
    this.numberOfSeats();
  }

  toggleExpand() {
    this.panelOpenState = !this.panelOpenState;
  }

  numberOfSeats(): void {
    const stations = this.floor.workstation.length;
    let number = 0;
    for (let i = 0; i < stations; i++) {
      if (this.floor.workstation[i].allSeats)
        number += this.floor.workstation[i].allSeats;
    }
    this.allSeats = number;
  }
}

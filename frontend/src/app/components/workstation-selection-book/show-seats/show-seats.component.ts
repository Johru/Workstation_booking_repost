import { Component, Input, OnInit } from '@angular/core';
import { Seat } from 'src/app/helpingHand/seat';
import { __classPrivateFieldSet } from 'tslib';

@Component({
  selector: 'show-seats',
  templateUrl: './show-seats.component.html',
  styleUrls: ['./show-seats.component.css'],
})
export class ShowSeatsComponent implements OnInit {
  @Input() seats?: Seat[];
  //output selected

  status: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  isItTaken(seat: string | null): string {
    if (seat == null) {
      return '';
    }
    return `Booked by ${seat}`;
  }

  disableSeat(seat: string | null): boolean {
    if (seat == null) {
      return false;
    } else {
      return true;
    }
  }
  checkSeat(e: any) {
    const isItTaken = e.target?.classList.contains('isItTaken');
    let target = e.target;
    if (isItTaken) {
      target = e.target.parentElement;
    }
    const hasClass = target.classList.contains('checked');
    if (hasClass) {
      target.classList.remove('checked');
    } else {
      Array.from(target.parentElement.children).forEach((button: any) => {
        button.classList.remove('checked');
      });
      target.classList.add('checked');
    }
  }
}

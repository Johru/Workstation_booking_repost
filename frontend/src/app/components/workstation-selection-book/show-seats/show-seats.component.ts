import { Component, Input, OnInit } from '@angular/core';
import { Seat } from 'src/app/helpingHand/seat';

@Component({
  selector: 'show-seats',
  templateUrl: './show-seats.component.html',
  styleUrls: ['./show-seats.component.css']
})
export class ShowSeatsComponent implements OnInit {
  @Input() seats?:Seat[];
  //output selected

  constructor() { }

  ngOnInit(): void {
  }

  isItTaken(seat: string): boolean{
    if (seat != null) {
      return false;
    }
  return true;
  }

}

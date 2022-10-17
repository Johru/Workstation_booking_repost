import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/helpingHand/reservation';
import { Seat } from 'src/app/helpingHand/seat';
import { WorkstationService } from 'src/app/services/workstation.service';

@Component({
  selector: 'workstation-form',
  templateUrl: './workstation-form.component.html',
  styleUrls: ['./workstation-form.component.css'],
})
export class WorkstationFormComponent implements OnInit {
  @Input() seatListFromParent?: Seat[];
  @Output() reservation = new EventEmitter<Reservation>();
  @Output() dateToRequestSeats = new EventEmitter<any>();

  selectedSeat?: number;
  seatList?: Seat[];
  planModel: any = { start_time: new Date() };
  selectedDate?: Date = new Date();
  confirmed: boolean = false;
  disabledButton: boolean = true;
  minDate: Date = new Date();

  constructor() {}

  ngOnInit(): void {}

  onChange(e: any) {
    this.selectedDate = e.target.value;
    this.requestSeats();
  }

  requestSeats() {
    this.dateToRequestSeats.emit(this.selectedDate);
  }

  makeReservation() {
    const date = new Date(
      this.planModel.start_time.getTime() -
        this.planModel.start_time.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];
    this.reservation!.emit({
      seat_id: this.selectedSeat!,
      reservation_date: date,
      user_id: 1, //change when user will be set up
    });
  }

  onSelect(selected: number) {
    if (selected == 0) {
      this.disabledButton = true;
    } else {
      this.selectedSeat = selected;
      this.disabledButton = false;
    }
  }
}

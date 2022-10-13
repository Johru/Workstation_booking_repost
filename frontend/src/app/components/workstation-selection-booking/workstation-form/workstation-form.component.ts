import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reservation } from 'src/app/helpingHand/reservation';
import { Seat } from 'src/app/helpingHand/seat';
import { WorkstationService } from 'src/app/services/workstation.service';

@Component({
  selector: 'workstation-form',
  templateUrl: './workstation-form.component.html',
  styleUrls: ['./workstation-form.component.css'],
})
export class WorkstationFormComponent implements OnInit {
  @Input() selectedWorkstationOnTab?: number | string;
  @Input() seatList?: Seat[];
  @Input() selectedSeat?: number;
  @Input() wsIdAndName?: { id: string | number; name: string };

  @Output() reservation = new EventEmitter<Reservation>();

  planModel: any = { start_time: new Date() };
  selectedDate?: Date;
  confirmed: boolean = false;
  disabledButton: boolean = true;
  minDate: Date = new Date();

  constructor(private wsService: WorkstationService) {}

  ngOnInit(): void {
    this.getSeats();
  }

  getSeats(): void {
    this.seatList = this.wsService.getSeats();
  }

  onChange(e: any) {
    this.getSeats();
    this.selectedDate = e.target.value;
    const iso = this.planModel.start_time.toISOString();
    console.log(iso.substring(0, iso.indexOf('T')));
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
      res_date: date,
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

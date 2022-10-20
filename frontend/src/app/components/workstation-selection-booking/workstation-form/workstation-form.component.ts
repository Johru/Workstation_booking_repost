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
  @Input() seatListFromParent?: Seat[];
  @Input() selectedWorkstation?: number;
  @Output() reservation = new EventEmitter<Reservation>();
  @Output() dateToRequestSeats = new EventEmitter<any>();

  selectedSeat?: number;
  seatList?: Seat[];
  planModel: any = { start_time: new Date() };
  selectedDate?: Date = new Date();
  confirmed: boolean = false;
  disabledButton: boolean = true;
  minDate: Date = new Date();

  constructor(private workstationService: WorkstationService) {}

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
    this.workstationService
      .locateWorkstation(this.selectedWorkstation!)
      .subscribe((data) => {
        this.reservation!.emit({
          seat_id: this.selectedSeat!,
          reservation_date: date,
          user_id: data[0], //change when user will be set up
          workstation_name: data[1][0].workstation_name,
          floor_name: data[1][0].floor.floor_name,
          building_address: data[1][0].floor.building.building_address,
          building_name: data[1][0].floor.building.building_name,
        });
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

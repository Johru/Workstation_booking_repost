import { Component, Input, OnInit } from '@angular/core';
import { Seat } from 'src/app/helpingHand/seat';
import { WorkstationService } from 'src/app/services/workstation.service';


@Component({
  selector: 'workstation-form',
  templateUrl: './workstation-form.component.html',
  styleUrls: ['./workstation-form.component.css']
})
export class WorkstationFormComponent implements OnInit {
  @Input() selectedWS?: number | string;
  @Input() seatList?: Seat[];
  //seat is coming from the child
  //output seat
  //output date
  constructor(private wsService: WorkstationService) { }
  
  ngOnInit(): void {
    this.getSeats()
  }

  getSeats(): void {
    this.seatList = this.wsService.getSeats();
  }

  //click method on book button send data with the service

}

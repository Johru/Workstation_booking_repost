import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatExpansionPanel } from '@angular/material/expansion';

import { Floor } from 'src/app/help-files/floor-interface';
// import { Workstation } from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/admin-edit/floor.service';

@Component({
  selector: 'workstation-preview-input',
  templateUrl: './workstation-preview-input.component.html',
  styleUrls: ['./workstation-preview-input.component.css']
})
export class WorkstationPreviewInputComponent implements OnInit {

  newWorkstationForm = new FormGroup({ // error because thit part
    // floor_id: new FormControl(),
    workstations: new FormControl(),
    seats: new FormControl()
  })

  workstation!: Floor;
  // workstations: Floor[] = [];
 

  @Input() cancelButton?: MatExpansionPanel; // for CANCEL BUTTON

  // @Output() newWorkstationEvent = new EventEmitter<Floor>();

  constructor(private floorService: FloorService) { }


  onSubmit(): void {
    // this.workstation = { //rework
    //   // floor_id: this.newWorkstationForm.value.floor_id,
    //   workstations: this.newWorkstationForm.value.workstation_name,
    //   seats: this.newWorkstationForm.value.seats
    // }
    // this.newWorkstationEvent.emit(this.workstation); // rework
    // this.newWorkstationForm.reset(); //rework
    // console.log(this.workstation); //rework
    // this.ngOnInit();
  }

  ngOnInit(): void {
  }


  // getWorkstation(): void {
  //   this.workstations = this.floorService.getWorkstation();
  // }

 

    // onChange(): void {
    //   this.getWorkstation();
    // }

}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Floor } from 'src/app/help-files/floor-interface';
import { Workstation } from 'src/app/help-files/workstation-interface';

@Component({
  selector: 'workstation-preview-input',
  templateUrl: './workstation-preview-input.component.html',
  styleUrls: ['./workstation-preview-input.component.css']
})
export class WorkstationPreviewInputComponent implements OnInit {

  newWorkstationForm = new FormGroup({
    floor_id: new FormControl(),
    workstation_name: new FormControl(),
    seats: new FormControl()
  })

  workstation?: Workstation;

  @Output() newWorkstationEvent = new EventEmitter<Workstation>();

  constructor() { }

  onSubmit(): void {
    this.workstation = {
      floor_id: this.newWorkstationForm.value.floor_id,
      workstation_name: this.newWorkstationForm.value.workstation_name,
      seats: this.newWorkstationForm.value.seats
    }
    this.newWorkstationEvent.emit(this.workstation);
    this.newWorkstationForm.reset();
    console.log(this.workstation);
    
  }

  ngOnInit(): void {
  }

}

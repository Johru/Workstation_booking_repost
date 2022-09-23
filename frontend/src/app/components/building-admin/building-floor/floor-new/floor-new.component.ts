import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Floor } from 'src/app/help-files/floor-interface';

@Component({
  selector: 'floor-new',
  templateUrl: './floor-new.component.html',
  styleUrls: ['./floor-new.component.css']
})
export class FloorNewComponent implements OnInit {

  newFloorForm = new FormGroup({
    floor_id: new FormControl(),
    floor_name: new FormControl()
  })

  floor!: Floor;

  @Output() newFloorEvent = new EventEmitter<Floor>();

  constructor() { }

  onSubmit(): void {
    this.floor = {
      floor_id: this.newFloorForm.value.floor_id,
      floor_name: this.newFloorForm.value.floor_name
    }
    this.newFloorEvent.emit(this.floor);
    this.newFloorForm.reset();
  }

  ngOnInit(): void {
  }

}

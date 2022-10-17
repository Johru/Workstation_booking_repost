import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Floor } from 'src/app/help-files/floor-interface';
import { FloorService } from 'src/app/services/floor.service';

import { AddFloor } from 'src/app/help-files/floor-interface';

@Component({
  selector: 'floor-new',
  templateUrl: './floor-new.component.html',
  styleUrls: ['./floor-new.component.css'],
})
export class FloorNewComponent {
  @Output() newFloorEvent = new EventEmitter<AddFloor>();
  newFloorForm = new FormGroup({
    building_id: new FormControl(),
    floor_name: new FormControl(),
  });

  constructor(private floorService: FloorService) {}

  onSubmit(): void {
    const floor: AddFloor = {
      building_id: 10,
      //  building_id: this.floorService.floorId(),
      floor_name: this.newFloorForm.value.floor_name,
    };
    this.newFloorEvent.emit(floor);
    this.newFloorForm.reset();
  }
}

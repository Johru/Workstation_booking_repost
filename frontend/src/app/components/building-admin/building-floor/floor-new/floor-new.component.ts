import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Floor } from 'src/app/help-files/floor-interface';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'floor-new',
  templateUrl: './floor-new.component.html',
  styleUrls: ['./floor-new.component.css'],
})
export class FloorNewComponent {
  @Output() newFloorEvent = new EventEmitter<Floor>();
  newFloorForm = new FormGroup({
    floor_id: new FormControl(),
    floor_name: new FormControl(),
  });
  floor!: Floor;

  constructor(private floorService: FloorService) {}

  onSubmit(): void {
    this.floor = {
      floor_id: this.floorService.floorId(),
      floor_name: this.newFloorForm.value.floor_name,
      workstations: [],
    };
    this.newFloorEvent.emit(this.floor);
    this.newFloorForm.reset();
  }
}

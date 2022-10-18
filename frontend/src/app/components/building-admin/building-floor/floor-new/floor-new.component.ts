import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AddFloor } from 'src/app/help-files/floor-interface';

@Component({
  selector: 'floor-new',
  templateUrl: './floor-new.component.html',
  styleUrls: ['./floor-new.component.css'],
})
export class FloorNewComponent {
  @Output() newFloorEvent = new EventEmitter<AddFloor>();
  buildingId!: number;
  newFloorForm = new FormGroup({
    floor_name: new FormControl(),
  });

  constructor(private route: ActivatedRoute) {}

  onSubmit(): void {
    this.buildingId = Number(this.route.snapshot.params['id']);
    const floor: AddFloor = {
      building_id: this.buildingId,
      floor_name: this.newFloorForm.value.floor_name,
    };
    this.newFloorEvent.emit(floor);
    this.newFloorForm.reset();
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { Building } from 'src/app/help-files/buildind-interface';

@Component({
  selector: 'building-new',
  templateUrl: './building-new.component.html',
  styleUrls: ['./building-new.component.css'],
})
export class BuildingNewComponent {
  selectedId: string = '';
  building!: Building;

  @Output() newBuildingEvent = new EventEmitter<Building>();

  newBuildingForm = new FormGroup({
    building_id: new FormControl(),
    building_name: new FormControl(),
    building_address: new FormControl(),
    building_state: new FormControl(),
    building_zip: new FormControl(),
    building_city: new FormControl(),
  });

  constructor() {}

  onSubmit(): void {
    this.building = {
      building_id: this.newBuildingForm.value.building_id,
      building_name: this.newBuildingForm.value.building_name,
      building_address: this.newBuildingForm.value.building_address,
      building_state: this.newBuildingForm.value.building_state,
      building_zip: this.newBuildingForm.value.building_zip,
      building_city: this.newBuildingForm.value.building_city,
    };
    this.newBuildingEvent.emit(this.building);
    this.newBuildingForm.reset();
  }

  pickId(id: string) {
    this.selectedId = id;
  }
}

import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Building } from 'src/app/help-files/buildind-interface';
import { BuildingService } from 'src/app/services/building-new.service';

@Component({
  selector: 'building-new',
  templateUrl: './building-new.component.html',
  styleUrls: ['./building-new.component.css'],
})
export class BuildingNewComponent {
  @Output() newBuildingEvent = new EventEmitter<Building>();
  selectedId: string = '';
  building!: Building;
  newBuildingForm = new FormGroup({
    building_id: new FormControl(),
    building_name: new FormControl(),
    building_address: new FormControl(),
    building_state: new FormControl(),
    building_zip: new FormControl(),
    building_city: new FormControl(),
  });

  constructor(private buildingService: BuildingService) {}

  onSubmit(): void {
    this.building = {
      building_id: this.buildingService.buildingId(),
      building_name: this.newBuildingForm.value.building_name,
      building_address: this.newBuildingForm.value.building_address,
      building_state: this.newBuildingForm.value.building_state,
      building_zip: this.newBuildingForm.value.building_zip,
      building_city: this.newBuildingForm.value.building_city,
    };
    this.newBuildingEvent.emit(this.building);
    this.newBuildingForm.reset();
  }

  pickId(): string {
    let id = (this.selectedId = String(this.buildingService.buildingId()));
    return id;
  }
}

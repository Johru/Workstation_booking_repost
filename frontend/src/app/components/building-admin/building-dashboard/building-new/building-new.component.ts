import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Building } from 'src/app/helpingHand/buidling';
import { BuildingNewService } from 'src/app/services/building-new.service';

@Component({
  selector: 'building-new',
  templateUrl: './building-new.component.html',
  styleUrls: ['./building-new.component.css'],
})
export class BuildingNewComponent {
  @Output() newBuildingEvent = new EventEmitter<Building>();
  newBuildingForm = new FormGroup({
    building_id: new FormControl(),
    building_name: new FormControl(),
    building_address: new FormControl(),
    building_country: new FormControl(),
    building_zip: new FormControl(),
    building_city: new FormControl(),
    building_image: new FormControl(),
  });

  constructor(
    private buildingService: BuildingNewService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.newBuildingForm.value.building_id = this.buildingService.buildingId();
    this.newBuildingEvent.emit(this.newBuildingForm.value as Building);
    this.router.navigate([
      `${this.router.url}/${this.newBuildingForm.value.building_id}/floor`,
    ]);
    this.newBuildingForm.reset();
  }
}

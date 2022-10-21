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
  building_id?: number;

  @Output() newBuildingEvent = new EventEmitter<Building>();
  newBuildingForm = new FormGroup({
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

  onSubmit(newBuilding: Building): void {
    this.buildingService
      .addBuilding(newBuilding)
      .subscribe((res: any) =>
        this.router.navigate([`${this.router.url}/${res.data}/floor`])
      );
  }
}

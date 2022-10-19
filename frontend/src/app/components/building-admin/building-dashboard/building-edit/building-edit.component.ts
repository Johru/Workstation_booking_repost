import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Building } from 'src/app/help-files/building-interface';
import { BuildingNewService } from 'src/app/services/building-new.service';

@Component({
  selector: 'building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.css'],
})
export class BuildingEditComponent implements OnInit {
  @Input() actualBuilding?: Building;
  editBuildingForm = new FormGroup({
    building_id: new FormControl(),
    building_name: new FormControl(),
    building_address: new FormControl(),
    building_state: new FormControl(),
    building_zip: new FormControl(),
    building_city: new FormControl(),
    building_image: new FormControl(),
  });

  constructor(
    private buildingService: BuildingNewService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setInitialValues(this.actualBuilding!);
  }

  onSubmit(): void {
    this.buildingService.editBuilding(this.editBuildingForm.value as Building);
    this.router.navigate([`${this.router.url}/floor`]);
  }

  setInitialValues(initialBuilding: Building) {
    const building = {
      building_id: initialBuilding.building_id,
      building_name: initialBuilding.building_name,
      building_address: initialBuilding.building_address,
      building_state: initialBuilding.building_state,
      building_zip: initialBuilding.building_zip,
      building_city: initialBuilding.building_city,
      building_image: initialBuilding.building_image,
    };

    this.editBuildingForm.setValue(building);
  }
}

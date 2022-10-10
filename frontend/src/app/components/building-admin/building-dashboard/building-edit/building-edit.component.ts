import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Building } from 'src/app/help-files/buildind-interface';
import { BuildingService } from 'src/app/services/building-new.service';

@Component({
  selector: 'building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.css'],
})
export class BuildingEditComponent implements OnInit {
  @Output() editBuildingEvent = new EventEmitter<Building>();
  @Input() actualBuilding?: Building;
  selectedBuilding?: Building;
  selectedId: string = '';
  editBuildingForm = new FormGroup({
    building_id: new FormControl(),
    building_name: new FormControl(),
    building_address: new FormControl(),
    building_state: new FormControl(),
    building_zip: new FormControl(),
    building_city: new FormControl(),
    building_image: new FormControl(),
  });

  constructor(private buildingService: BuildingService) {}

  ngOnInit(): void {
    this.selectedBuilding = this.actualBuilding;
    this.selectedId = String(this.actualBuilding?.building_id);
  }

  onSubmit(): void {
    (this.selectedBuilding!.building_name =
      this.editBuildingForm.value.building_name),
      (this.selectedBuilding!.building_address =
        this.editBuildingForm.value.building_address),
      (this.selectedBuilding!.building_state =
        this.editBuildingForm.value.building_state),
      (this.selectedBuilding!.building_zip =
        this.editBuildingForm.value.building_zip),
      (this.selectedBuilding!.building_city =
        this.editBuildingForm.value.building_city),
      (this.selectedBuilding!.building_image =
        this.editBuildingForm.value.building_image);
    this.buildingService.editBuilding(this.selectedBuilding!);
  }
}

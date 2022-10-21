import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Building } from '../../../../helpingHand/buidling';
import { BuildingNewService } from 'src/app/services/building-new.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'building-edit',
  templateUrl: './building-edit.component.html',
  styleUrls: ['./building-edit.component.css'],
})
export class BuildingEditComponent implements OnInit {
  buildingId?: number;
  editBuildingForm = new FormGroup({
    building_name: new FormControl(),
    building_address: new FormControl(),
    building_country: new FormControl(),
    building_zip: new FormControl(),
    building_city: new FormControl(),
    building_image: new FormControl(),
  });

  constructor(
    private buildingService: BuildingNewService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const nr: number = Number(this.route.snapshot.params['id']);
    if (!nr) {
      this.buildingId = 0;
    } else {
      this.buildingId = nr;
      this.getBuilding(this.buildingId);
    }
  }

  onSubmit(values: Building): void {
    this.buildingService.editBuilding(this.buildingId!, values);
    this.router.navigate([`${this.router.url}/floor`]);
  }

  setInitialValues(initialBuilding: Building) {
    this.editBuildingForm.patchValue({
      building_name: initialBuilding.building_name,
      building_address: initialBuilding.building_address,
      building_zip: initialBuilding.building_zip,
      building_country: initialBuilding.building_country,
      building_city: initialBuilding.building_city,
      building_image: initialBuilding.building_image,
    });
  }

  getBuilding(id: number): void {
    this.buildingService.getBuilding(id).subscribe({
      next: (data: Building) => {
        this.setInitialValues(data);
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }
}

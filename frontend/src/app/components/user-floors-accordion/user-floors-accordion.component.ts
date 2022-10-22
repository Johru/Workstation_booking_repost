import { Component, OnInit } from '@angular/core';
import { FloorService } from 'src/app/services/floor.service';
import { BuildingNewService } from 'src/app/services/building-new.service';
import { Floor } from 'src/app/help-files/floor-interface';
import { Building } from 'src/app/helpingHand/buidling';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'user-floors-accordion',
  templateUrl: './user-floors-accordion.component.html',
  styleUrls: ['./user-floors-accordion.component.css'],
})
export class UserFloorsAccordionComponent implements OnInit {
  floors: Floor[] = [];
  buildingId!: number;
  building!: Building;
  buildingName?: string;

  constructor(
    private floorService: FloorService,
    private buildingService: BuildingNewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildingId = Number(this.route.snapshot.params['id']);
    this.getBuilding(this.buildingId);
    this.getFloor(this.buildingId);
  }

  getFloor(buildingId: number): void {
    this.floorService.getFloor(buildingId).subscribe({
      next: floors => {
        for (let floor of floors) {
          if (floor.workstation.length > 0) {
            this.floors.push(floor);
          }
        }
      },
      error: error => {
        console.error(error);
      },
    });
  }

  getBuilding(buildingId: number) {
    this.buildingService.getBuilding(buildingId!).subscribe({
      next: data => {
        this.building = data;
        this.buildingName = this.building.building_name;
      },
      error: error => {
        console.error(error);
      },
    });
  }
}

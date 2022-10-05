import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Building } from 'src/app/help-files/buildind-interface';
import { Floor } from 'src/app/help-files/floor-interface';
import { FloorService } from 'src/app/services/admin-edit/floor.service';
import { BuildingService } from 'src/app/services/admin-edit/building.service';

@Component({
  selector: 'building-floor',
  templateUrl: './building-floor.component.html',
  styleUrls: ['./building-floor.component.css'],
})
export class BuildingFloorComponent implements OnInit {
  buildings: Building[] = [];
  floors: Floor[] = [];
  buildingId: number = 0;

  constructor(
    private floorService: FloorService,
    private buildingService: BuildingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildingId = Number(this.route.snapshot.params['id']) - 1;
    this.getBuilding();
    this.getFloor();
  }

  getFloor(): void {
    this.floors = this.floorService.getFloor();
  }

  getBuilding(): void {
    this.buildings = this.buildingService.getBuildings();
  }

  addFloor(newFloor: Floor) {
    this.floorService.addFloor(newFloor);
    console.log('test floor');
    console.log(newFloor);
  }
}

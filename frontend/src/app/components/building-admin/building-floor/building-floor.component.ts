import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Building } from 'src/app/help-files/buildind-interface';
import { Floor } from 'src/app/help-files/floor-interface';
import { FloorService } from 'src/app/services/floor.service';
import { BuildingService } from 'src/app/services/building-new.service';

@Component({
  selector: 'building-floor',
  templateUrl: './building-floor.component.html',
  styleUrls: ['./building-floor.component.css'],
})
export class BuildingFloorComponent implements OnInit {
  floors: Floor[] = [];
  buildingId: number = 0;
  building?: Building;

  constructor(
    private floorService: FloorService,
    private buildingService: BuildingService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildingId = Number(this.route.snapshot.params['id']);
    this.getBuilding();
    this.getFloor();
  }

  getFloor(): void {
    this.floors = this.floorService.getFloor();
  }

  getBuilding(): void {
    this.building = this.buildingService.getBuilding(this.buildingId);
  }

  addFloor(newFloor: Floor) {
    this.floorService.addFloor(newFloor);
  }
}

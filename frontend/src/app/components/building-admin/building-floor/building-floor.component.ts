import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Building } from 'src/app/help-files/buildind-interface';
import { AddFloor, Floor } from 'src/app/help-files/floor-interface';
import { FloorService } from 'src/app/services/floor.service';
import { BuildingNewService } from 'src/app/services/building-new.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'building-floor',
  templateUrl: './building-floor.component.html',
  styleUrls: ['./building-floor.component.css'],
})
export class BuildingFloorComponent implements OnInit {
  floors: Floor[] = [];
  buildingId!: number;
  building?: Building;

  constructor(
    private floorService: FloorService,
    private buildingService: BuildingNewService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.buildingId = Number(this.route.snapshot.params['id']);
    // this.getBuilding(this.buildingId);
    this.getFloor(this.buildingId);
  }

  getFloor(buildingId: number): void {
    this.floorService.getFloor(buildingId).subscribe({
      next: floors => {
        this.floors = floors;
      },
      error: error => {
        console.error(error);
      },
    });
  }

  // getBuilding(buildingId: number): Observable<any> {
  //  this.building = this.buildingService.getBuilding(buildingId);
  // }

  addFloor(newFloor: AddFloor) {
    this.floorService.addFloor(newFloor, this.buildingId).subscribe({
      next: response => {
        if (response.status == 'OK') {
          this.floors.push(response.floor!);
          this.getFloor(this.buildingId);
        }
      },
      error: error => {
        console.error(error);
      },
    });
  }
}

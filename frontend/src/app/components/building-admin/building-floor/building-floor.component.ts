import { Component, OnInit } from '@angular/core';

import { Building } from 'src/app/help-files/buildind-interface';
import { Floor } from 'src/app/help-files/floor-interface';
import { FloorService } from 'src/app/services/admin-edit/floor.service';
import { BuildingService } from 'src/app/services/admin-edit/building.service';

@Component({
  selector: 'building-floor',
  templateUrl: './building-floor.component.html',
  styleUrls: ['./building-floor.component.css']
})
export class BuildingFloorComponent implements OnInit {

 
  buildings: Building[] = []
  floors: Floor[] = []; 

  constructor(private floorService: FloorService,
   private buildingService: BuildingService) { }

  ngOnInit(): void {
    this.getBuilding();
    this.getFloor();
    // this.getWorkstation();
     console.log(this.floors);   
  }

  getFloor(): void {
    this.floors = this.floorService.getFloor();   
  }

  // getWorkstation(): void {
  //   this.workstations = this.workstationService.getWorkstation();   
  // }

  getBuilding(): void {
    this.buildings = this.buildingService.getBuildings();
  }

  addFloor(newFloor: Floor) {
    this.floorService.addFloor(newFloor);  
    console.log('test floor') 
    console.log(newFloor)
    console.log(this.floors)
  }

}

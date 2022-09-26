import { Component, OnInit, Input } from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';
import { Workstation } from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/admin-edit/floor.service';


@Component({
  selector: 'floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent implements OnInit {

  floors: Floor[] = [];
  workstations: Workstation[] = [];

  panelOpenState = false;  

  @Input() floorList?: Floor[];
  @Input() workstationList?: Workstation[];


  constructor(private floorService: FloorService) { }

  ngOnInit(): void {  
    this.getFloor();   
     console.log(this.floors);   
     this.getWorkstation();
   
  }

  getFloor(): void {
    this.floors = this.floorService.getFloor();   
  }

  addWorkstation(newWorkstation: Workstation): void {
    this.floorService.addWorkstation(newWorkstation);
    this.ngOnInit();
  }

  getWorkstation(): void {
    this.workstations = this.floorService.getWorkstation();
  }

  // onChange(): void {
  //   this.getWorkstation();
  // }

}

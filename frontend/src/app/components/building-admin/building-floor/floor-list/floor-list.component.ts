import { Component, OnInit, Input, OnChanges } from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
// import { Workstation } from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/admin-edit/floor.service';


@Component({
  selector: 'floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent implements OnInit {

  floors: Floor[] = [];
  managementMenuVisible: boolean = false;
  previewMenuVisible: boolean = true;
  crossroadMenuVisible: boolean = false;
  panelOpenState = false;

  @Input() floorList?: Floor[];

  constructor(private floorService: FloorService) { }

  ngOnInit(): void {
    this.getFloor();
    console.log(this.floors);
  }

  getFloor(): void {
    this.floors = this.floorService.getFloor();
  }

  addWorkstation(i: number, newWorkstation: WorkstationInterface): void {
    this.floors[i].workstations.push(newWorkstation)
    // this.floors[i].workstations[i].workstation_isActive = false
    console.log('test add workstation')
    console.log(newWorkstation)
    console.log(this.previewMenuVisible)
    console.log(this.managementMenuVisible)
    // setTimeout(() => {this.switchManagementAndPreview()},2000);

    this.switchManagementAndPreview();
  }

  switchManagementAndPreview() {
    this.managementMenuVisible = !this.managementMenuVisible;
    this.previewMenuVisible = !this.previewMenuVisible;
  }

  closePanelFromChild() {
    this.panelOpenState = !this.panelOpenState
  }

}

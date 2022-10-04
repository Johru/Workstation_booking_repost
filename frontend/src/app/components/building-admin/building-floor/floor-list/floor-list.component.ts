import { transition } from '@angular/animations';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/admin-edit/floor.service';


@Component({
  selector: 'floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css']
})
export class FloorListComponent implements OnInit {

  floors: Floor[] = [];
  managementButtonMenuVisible: boolean = false;
  previewMenuVisible: boolean = true;
  crossroadMenuVisible: boolean = false;
  panelOpenState = false;
  confirmDeleteValue: boolean = false;
  modalDeleteValue: boolean= true;

  
  @Input() floorList?: Floor[];
  // @Output() reloadFloor = new EventEmitter();

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
  
    console.log('test add workstation')
    console.log(newWorkstation)
    // console.log(this.previewMenuVisible)
    // console.log(this.managementButtonMenuVisible)  

    this.switchManagementAndPreview();
    // this.reloadFloor.emit();   
  }

  switchManagementAndPreview() {
    this.managementButtonMenuVisible = !this.managementButtonMenuVisible;
    this.previewMenuVisible = !this.previewMenuVisible;
  }

  closePanelFromChild(event: boolean) {
    // this.panelOpenState = !this.panelOpenState
    this.panelOpenState = event;
    console.log(event)
    console.log(this.panelOpenState)
  }


  cancelDelete(event: boolean) {
    if (event) {    
      this.modalDeleteValue = event;
    }
  }

  confirmDelete(event: boolean) {
    if (event) {
      this.confirmDeleteValue = event;
    }
  }

}

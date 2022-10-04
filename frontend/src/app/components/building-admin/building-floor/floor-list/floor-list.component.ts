import { transition } from '@angular/animations';
import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';

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
  panelOpenState? : boolean;
  confirmDeleteValue: boolean = false;
  status?: string;
  selectedWorkstation?: WorkstationInterface;

  
  @Input() floor!: Floor;
  // @Output() reloadFloor = new EventEmitter();

  constructor(private floorService: FloorService) { }

  ngOnInit(): void {
    this.getFloor();
    console.log(this.floor.workstations);    
    this.panelOpenState = false
  }

  toggleExpand(){
    this.panelOpenState = !this.panelOpenState;
    console.log(this.panelOpenState)
  }

  getFloor(): void {
    this.floors = this.floorService.getFloor();
  }

  addWorkstation( newWorkstation: WorkstationInterface): void {
    this.floor.workstations.push(newWorkstation)
  
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
    this.toggleExpand()
  }


  cancel(event: boolean) {
    if (event) {    
      this.toggleConfirmModal();
    }
  }

  confirm(event: boolean) {
    if (event) {
      this.toggleConfirmModal();
    }
  }

  toggleConfirmModal(){
    this.confirmDeleteValue = !this.confirmDeleteValue;
  }

  onDisableClick(selectedWorkstation:WorkstationInterface){
    console.log(selectedWorkstation)
    this.toggleConfirmModal();
    this.status = 'Disable'
    this.selectedWorkstation = selectedWorkstation
  }

}

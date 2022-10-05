import { transition } from '@angular/animations';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/admin-edit/floor.service';

@Component({
  selector: 'floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css'],
})
export class FloorListComponent implements OnInit {
  floors: Floor[] = [];
  // workstationList?: WorkstationInterface;
  managementButtonMenuVisible: boolean = false;
  previewMenuVisible: boolean = true;
  crossroadMenuVisible: boolean = false;
  panelOpenState?: boolean;
  confirmDeleteValue: boolean = false;
  status?: string;
  selectedWorkstation?: WorkstationInterface;
  allSeats?: number;

  @Input() floor!: Floor;

  // @Output() reloadFloor = new EventEmitter();

  constructor(private floorService: FloorService) {}

  ngOnInit(): void {
    this.getFloor();
    console.log(this.floor.workstations); //DELETE
    this.panelOpenState = false;
    this.numberOfSeats();
  }

  toggleExpand() {
    this.panelOpenState = !this.panelOpenState;
    console.log(this.panelOpenState);
  }

  getFloor(): void {
    this.floors = this.floorService.getFloor();
  }

  addWorkstation(newWorkstation: WorkstationInterface): void {
    this.floor.workstations.push(newWorkstation);

    console.log('test add workstation');
    console.log(newWorkstation);
    // console.log(this.previewMenuVisible)
    // console.log(this.managementButtonMenuVisible)
    this.switchManagementAndPreview();
    this.numberOfSeats();
  }

  numberOfSeats(): void {
    console.log('ws' + this.floor.workstations.length); //DELETE
    let stations = this.floor.workstations.length;
    let number = 0;
    for (let i = 0; i < stations; i++) {
      number = number + this.floor.workstations[i].seats;
    }
    this.allSeats = number;
  }

  switchManagementAndPreview() {
    this.managementButtonMenuVisible = !this.managementButtonMenuVisible;
    this.previewMenuVisible = !this.previewMenuVisible;
  }

  closePanelFromChild(event: boolean) {
    this.toggleExpand();
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

  toggleConfirmModal() {
    this.confirmDeleteValue = !this.confirmDeleteValue;
  }

  onDisableClick(selectedWorkstation: WorkstationInterface) {
    console.log(selectedWorkstation);
    this.toggleConfirmModal();
    this.status = 'Disable';
    this.selectedWorkstation = selectedWorkstation;
  }

  onDeleteClick(selectedWorkstation: WorkstationInterface) {
    console.log(selectedWorkstation);
    this.toggleConfirmModal();
    this.status = 'Delete';
    console.log(this.status);
    this.selectedWorkstation = selectedWorkstation;
  }
}

import { transition } from '@angular/animations';
import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/admin-edit/floor.service';

@Component({
  selector: 'floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css'],
})
export class FloorListComponent implements OnInit, AfterContentChecked {
  floors: Floor[] = [];
  // workstationList?: WorkstationInterface;
  selectedWorkstationToEdit?: WorkstationInterface;
  managementButtonMenuVisible: boolean = false;
  previewMenuVisible: boolean = true;
  crossroadMenuVisible: boolean = false;
  panelOpenState?: boolean;
  confirmDeleteValue: boolean = false;
  status?: string;
  selectedWorkstation?: WorkstationInterface;
  allSeats?: number;
  successfullConfirm: boolean = false;
  addWorkstationPanel: boolean = false;
  editWorkstationPanel: boolean = false;

  @Input() floor!: Floor;

  // @Output() reloadFloor = new EventEmitter();

  constructor(
    private floorService: FloorService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getFloor();
    console.log(this.floor.workstations); //DELETE
    this.panelOpenState = false;
    this.numberOfSeats();
    if (this.floor.workstations.length == 0) {
      this.addWorkstationPanel = true;
    }
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  toggleExpand() {
    this.panelOpenState = !this.panelOpenState;
    this.editWorkstationPanel = false;
    this.addWorkstationPanel = false;
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
      this.successfullConfirm = event;
    }
  }

  confirm(event: boolean) {
    if (event) {
      this.toggleConfirmModal();
    }
    console.log(this.successfullConfirm);
    this.successfullConfirm = event;
    console.log(this.successfullConfirm);
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

  successfullConfirmOnManagement(switchConfirm: boolean) {
    console.log(switchConfirm);
    this.successfullConfirm = switchConfirm;
  }

  switchPanels() {
    this.addWorkstationPanel = !this.addWorkstationPanel;
  }

  showManagementPanel() {
    this.switchPanels();
    this.editWorkstationPanel = false;
  }

  isEditVisible() {
    if (this.addWorkstationPanel && !this.editWorkstationPanel) return true;
    return false;
  }

  showEditPanel(selectedWorkstation: WorkstationInterface) {
    console.log(this.selectedWorkstation);
    console.log(selectedWorkstation);
    this.selectedWorkstationToEdit = selectedWorkstation;
    this.switchPanels();
    this.editWorkstationPanel = !this.editWorkstationPanel;
  }
}

import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import { Floor } from 'src/app/help-files/floor-interface';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css'],
})
export class FloorListComponent implements OnInit, AfterContentChecked {
  @Input() floor!: Floor;
  floors: Floor[] = [];
  selectedWorkstationToEdit?: WorkstationInterface;
  panelOpenState?: boolean;
  confirmDeleteValue: boolean = false;
  status?: string;
  selectedWorkstation?: WorkstationInterface;
  allSeats?: number;
  successfullConfirm: boolean = false;
  addWorkstationPanel: boolean = false;
  editWorkstationPanel: boolean = false;

  constructor(
    private floorService: FloorService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getFloor();
    this.panelOpenState = false;
    this.numberOfSeats();
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  toggleExpand() {
    this.panelOpenState = !this.panelOpenState;
    if (this.floor.workstations.length != 0) {
      this.editWorkstationPanel = false;
      this.addWorkstationPanel = false;
    } else {
      this.addWorkstationPanel = true;
    }
  }

  getFloor(): void {
    this.floors = this.floorService.getFloor();
  }

  addWorkstation(newWorkstation: WorkstationInterface): void {
    this.floor.workstations.push(newWorkstation);
    this.numberOfSeats();
  }

  numberOfSeats(): void {
    let stations = this.floor.workstations.length;
    let number = 0;
    for (let i = 0; i < stations; i++) {
      number = number + this.floor.workstations[i].seats;
    }
    this.allSeats = number;
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
      if (this.floor.workstations.length == 0) {
        this.addWorkstationPanel = !this.addWorkstationPanel;
      }
    }
    this.successfullConfirm = event;
  }

  toggleConfirmModal() {
    this.confirmDeleteValue = !this.confirmDeleteValue;
    this.numberOfSeats();
  }

  onDisableClick(selectedWorkstation: WorkstationInterface) {
    this.toggleConfirmModal();
    this.status = 'Disable';
    this.selectedWorkstation = selectedWorkstation;
  }

  onDeleteClick(selectedWorkstation: WorkstationInterface) {
    this.toggleConfirmModal();
    this.status = 'Delete';
    this.selectedWorkstation = selectedWorkstation;
  }

  successfullConfirmOnManagement(switchConfirm: boolean) {
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
    this.selectedWorkstationToEdit = selectedWorkstation;
    this.switchPanels();
    this.editWorkstationPanel = !this.editWorkstationPanel;
  }
}

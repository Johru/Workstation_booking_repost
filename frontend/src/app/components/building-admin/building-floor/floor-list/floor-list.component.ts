import {
  Component,
  OnInit,
  Input,
  ChangeDetectorRef,
  AfterContentChecked,
} from '@angular/core';
import { Floor } from 'src/app/help-files/floor-interface';
import {
  AddWorkstationI,
  WorkstationInterface,
} from 'src/app/help-files/workstation-interface';
import { ResponseI } from 'src/app/helpingHand/response';
import { WorkstationService } from 'src/app/services/workstation.service';
@Component({
  selector: 'floor-list',
  templateUrl: './floor-list.component.html',
  styleUrls: ['./floor-list.component.css'],
})
export class FloorListComponent implements OnInit, AfterContentChecked {
  @Input() floor!: Floor;
  selectedWorkstationToEdit?: WorkstationInterface;
  panelOpenState?: boolean;
  confirmDeleteValue = false;
  status?: string;
  selectedWorkstation?: WorkstationInterface;
  allSeats?: number;
  successfullConfirm = false;
  addWorkstationPanel = false;
  editWorkstationPanel = false;
  confirmStatus?: string;

  constructor(
    private cd: ChangeDetectorRef,
    private workstationService: WorkstationService
  ) {}

  ngOnInit(): void {
    this.panelOpenState = false;
    this.numberOfSeats();
    if (this.floor.workstation.length == 0) {
      this.addWorkstationPanel = true;
    }
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  toggleExpand() {
    this.panelOpenState = !this.panelOpenState;
    if (this.floor.workstation.length != 0) {
      this.editWorkstationPanel = false;
      this.addWorkstationPanel = false;
    } else {
      this.addWorkstationPanel = true;
    }
  }

  addWorkstation(e: { name: string; seats: number }): void {
    const newWorkstation: AddWorkstationI = {
      workstation_name: e.name,
      floor_id: this.floor.floor_id,
    };
    this.workstationService.addWorkstation(newWorkstation, e.seats).subscribe({
      next: (res: ResponseI) => {
        if (res.status == 'OK') {
          const workstation = res.workstation;
          workstation!.allSeats = e.seats;
          this.floor.workstation.push(workstation!);
          this.numberOfSeats();
        } else {
          alert(
            'Something went wrong. Adding of new workstation was not successfull'
          );
        }
      },
      error: (e: Error) => {
        console.error(e);
      },
    });
  }

  numberOfSeats(): void {
    const stations = this.floor.workstation.length;
    let number = 0;
    for (let i = 0; i < stations; i++) {
      if (this.floor.workstation[i].allSeats)
        number += this.floor.workstation[i].allSeats;
    }
    this.allSeats = number;
  }

  closePanelFromChild() {
    this.toggleExpand();
  }

  cancel(event: boolean) {
    if (event) {
      this.toggleConfirmModal();
    }
  }

  confirm(status: string) {
    this.toggleConfirmModal();
    if (this.floor.workstation.length == 0) {
      this.addWorkstationPanel = !this.addWorkstationPanel;
    }
    this.successfullConfirm = true;
    this.confirmStatus = status;
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

  onActivateClick(selectedWorkstation: WorkstationInterface) {
    this.toggleConfirmModal();
    this.status = 'Activate';
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
    if (this.floor.workstation.length == 0) {
      this.addWorkstationPanel = false;
    } else {
      this.addWorkstationPanel = !this.addWorkstationPanel;
    }
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

  updateWorkstationList(event: { update: AddWorkstationI; id: number }) {
    const workstation = this.floor.workstation.find(
      ws => ws.workstation_id == event.id
    );
    const index = this.floor.workstation.indexOf(workstation!);
    workstation!.workstation_name = event.update.workstation_name;
    this.floor.workstation[index] = workstation!;
  }

  countSeatsAndCheckLength() {
    this.numberOfSeats();
  }
}

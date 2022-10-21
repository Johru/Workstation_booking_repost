import {
  Component,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { EventEmitter } from '@angular/core';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';

@Component({
  selector: 'workstation-management',
  templateUrl: './workstation-management.component.html',
  styleUrls: ['./workstation-management.component.css'],
})
export class WorkstationManagementComponent implements OnChanges {
  @Input() successfullConfirmOnManagement?: boolean;
  @Output() successfullConfirmOnManagementChange = new EventEmitter<boolean>();
  @Output() showPreviewEmitter = new EventEmitter();
  @Output() showEditEmitter = new EventEmitter<WorkstationInterface>();
  @Input() workstationList?: WorkstationInterface[];
  @Output() disableEmitter = new EventEmitter<WorkstationInterface>();
  @Output() activateEmitter = new EventEmitter<WorkstationInterface>();
  @Output() deleteEmitter = new EventEmitter<WorkstationInterface>();
  @Output() confirmEmitter = new EventEmitter<boolean>();
  @Input() status?: string;
  selectedWorkstation?: WorkstationInterface;
  defaultText = 'Select a workstation';
  selected = '0';

  ngOnChanges(changes: SimpleChanges) {
    if (this.successfullConfirmOnManagement) {
      this.successFullConfirm(
        changes['successfullConfirmOnManagement'].currentValue
      );
    }
  }

  onSelect(workstation: WorkstationInterface): void {
    this.selectedWorkstation = workstation;
  }

  disableSelected(): string {
    this.disableEmitter.emit(this.selectedWorkstation);
    return 'yes';
  }

  activateSelected(): string {
    this.activateEmitter.emit(this.selectedWorkstation);
    return 'yes';
  }

  deleteSelected(): string {
    this.deleteEmitter.emit(this.selectedWorkstation);
    return 'yes';
  }

  isSelectedActive(): boolean {
    if (this.selectedWorkstation?.workstation_isactive) return true;
    return false;
  }

  successFullConfirm(confirm: boolean): void {
    if (confirm) {
      switch (this.status) {
        case 'Delete':
          this.deleteConfirm();
          break;
        case 'Activate':
          this.switchStatusConfirm();
          break;
        case 'Disable':
          this.switchStatusConfirm();
          break;
      }
      this.successfullConfirmOnManagement = false;
      this.successfullConfirmOnManagementChange.emit(
        this.successfullConfirmOnManagement
      );
      this.confirmEmitter.emit(true);
    }
  }

  deleteConfirm() {
    const index = this.findWorkstationIndex(this.workstationList!);
    this.workstationList?.splice(index, 1);
    this.selected = '0';
  }

  switchStatusConfirm() {
    const index = this.findWorkstationIndex(this.workstationList!);
    this.workstationList![index].workstation_isactive =
      !this.workstationList![index].workstation_isactive;
  }

  findWorkstationIndex(workstation: WorkstationInterface[]): number {
    return workstation.indexOf(
      workstation.find(ws => ws.workstation_id == parseInt(this.selected))!
    );
  }

  showPreviewPanel() {
    this.showPreviewEmitter.emit();
  }

  showEditPanel() {
    this.showEditEmitter.emit(this.selectedWorkstation);
  }
}

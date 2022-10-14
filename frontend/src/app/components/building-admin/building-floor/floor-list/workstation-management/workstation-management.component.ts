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
  @Output() deleteEmitter = new EventEmitter<WorkstationInterface>();
  selectedWorkstation?: WorkstationInterface;
  defaultText: string = 'Select a workstation';
  selected: string = '0';

  constructor() {}

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

  deleteSelected(): string {
    this.deleteEmitter.emit(this.selectedWorkstation);
    return 'yes';
  }

  isSelectedDisabled(): boolean {
    if (this.selectedWorkstation?.workstation_isActive) return false;
    return true;
  }

  successFullConfirm(confirm: boolean): void {
    if (confirm) {
      let index = this.findWorkstationIndex(this.workstationList!);
      this.workstationList?.splice(index, 1);
      this.selected = '0';
      console.log(this.workstationList);
    }
    this.successfullConfirmOnManagement = false;
    this.successfullConfirmOnManagementChange.emit(
      this.successfullConfirmOnManagement
    );
  }

  findWorkstationIndex(workstation: WorkstationInterface[]): number {
    return workstation.indexOf(
      workstation.find((ws) => (ws.workstation_id = parseInt(this.selected)))!
    );
  }

  showPreviewPanel() {
    this.showPreviewEmitter.emit();
  }

  showEditPanel() {
    this.showEditEmitter.emit(this.selectedWorkstation);
  }
}

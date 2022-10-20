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
      this.selected = '0';
    }
    this.successfullConfirmOnManagement = false;
    this.successfullConfirmOnManagementChange.emit(
      this.successfullConfirmOnManagement
    );
  }

  showPreviewPanel() {
    this.showPreviewEmitter.emit();
  }

  showEditPanel() {
    this.showEditEmitter.emit(this.selectedWorkstation);
  }
}

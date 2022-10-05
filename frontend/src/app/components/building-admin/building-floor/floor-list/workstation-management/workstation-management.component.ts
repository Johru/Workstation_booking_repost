import {
  Component,
  OnInit,
  Input,
  Output,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';
import { EventEmitter } from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';

@Component({
  selector: 'workstation-management',
  templateUrl: './workstation-management.component.html',
  styleUrls: ['./workstation-management.component.css'],
})
export class WorkstationManagementComponent implements OnChanges {
  selectedWorkstation?: WorkstationInterface;
  workstationIsSelected: boolean = false;
  selectedIndex: any;
  defaultText: string = 'Select a workstation';
  selected: string = '0';
  disableButton: boolean = true;
  confirmDeleteValue: boolean = false;
  @Input() successfullConfirmOnManagement?: boolean;
  @Output() successfullConfirmOnManagementChange = new EventEmitter<boolean>();
  @Output() showPreviewEmitter = new EventEmitter();
  @Output() showEditEmitter = new EventEmitter<WorkstationInterface>();
  @Input() floorList?: Floor[];
  @Input() workstationList?: WorkstationInterface[];
  @Input() managementButtonMenuVisible?: boolean;
  @Output() disableEmitter = new EventEmitter<WorkstationInterface>();
  @Output() deleteEmitter = new EventEmitter<WorkstationInterface>();

  constructor(private router: Router) {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.successfullConfirmOnManagement) {
      this.successFullConfirm(
        changes['successfullConfirmOnManagement'].currentValue
      );
    }
  }

  onSelect(workstation: WorkstationInterface, i: number): void {
    this.selectedWorkstation = workstation;
    this.selectedIndex = i;
    this.disableButton = false;
  }
  onChangeInSelect() {
    console.log(this.selected);
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

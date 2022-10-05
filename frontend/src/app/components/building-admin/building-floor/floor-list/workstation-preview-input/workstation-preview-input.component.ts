import { Component, EventEmitter, OnInit, Output, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { WorkstationInterface } from 'src/app/help-files/workstation-interface';

@Component({
  selector: 'workstation-preview-input',
  templateUrl: './workstation-preview-input.component.html',
  styleUrls: ['./workstation-preview-input.component.css'],
})
export class WorkstationPreviewInputComponent implements OnInit {
  @Input() buttonValueToFalse?: boolean;
  @Output() closePanel = new EventEmitter<boolean>();
  @Output() showManagementEmitter = new EventEmitter();
  @Output() newWorkstationEvent = new EventEmitter<WorkstationInterface>();

  newWorkstationForm = new FormGroup({
    workstation_id: new FormControl(),
    workstation_name: new FormControl(),
    seats: new FormControl(),
  });
  workstation!: WorkstationInterface;

  constructor() {}

  ngOnInit(): void {
    this.newWorkstationForm.reset();
  }

  onSubmit(): void {
    this.workstation = {
      workstation_id: this.newWorkstationForm.value.workstation_id,
      workstation_name: this.newWorkstationForm.value.workstation_name,
      seats: Number(this.newWorkstationForm.value.seats),
      workstation_isActive: true,
    };
    this.newWorkstationEvent.emit(this.workstation);
    this.newWorkstationForm.reset();
    this.goToWorkstationManagement();
  }

  clickToClosePanel(): void {
    this.closePanel.emit(true);
  }

  goToWorkstationManagement() {
    this.showManagementEmitter.emit();
  }
}

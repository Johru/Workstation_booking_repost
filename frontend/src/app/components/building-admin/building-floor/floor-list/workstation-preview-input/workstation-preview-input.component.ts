import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'workstation-preview-input',
  templateUrl: './workstation-preview-input.component.html',
  styleUrls: ['./workstation-preview-input.component.css'],
})
export class WorkstationPreviewInputComponent implements OnInit {
  @Output() closePanel = new EventEmitter<boolean>();
  @Output() showManagementEmitter = new EventEmitter();
  @Output() newWorkstationEvent = new EventEmitter<WorkstationInterface>();
  newWorkstationForm = new FormGroup({
    workstation_name: new FormControl(),
    allSeats: new FormControl(),
  });

  constructor(private workstationId: FloorService) {}

  ngOnInit(): void {
    this.newWorkstationForm.reset();
  }

  onSubmit(): void {
    const workstation: WorkstationInterface = {
      workstation_id: this.workstationId.workstationId(),
      workstation_name: this.newWorkstationForm.value.workstation_name,
      allSeats: Number(this.newWorkstationForm.value.allSeats),
      workstation_isActive: true,
    };
    this.newWorkstationEvent.emit(workstation);
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
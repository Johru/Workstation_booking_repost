import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  AddWorkstationI,
  WorkstationInterface,
} from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'workstation-preview-input',
  templateUrl: './workstation-preview-input.component.html',
  styleUrls: ['./workstation-preview-input.component.css'],
})
export class WorkstationPreviewInputComponent implements OnInit {
  @Output() closePanel = new EventEmitter<boolean>();
  @Output() showManagementEmitter = new EventEmitter();
  @Output() newWorkstationEvent = new EventEmitter<{
    name: string;
    seats: number;
  }>();
  newWorkstationForm = new FormGroup({
    workstation_name: new FormControl(),
    seats: new FormControl(),
  });

  constructor(private workstationId: FloorService) {}

  ngOnInit(): void {
    this.newWorkstationForm.reset();
  }

  onSubmit(): void {
    const workstationName: string =
      this.newWorkstationForm.value.workstation_name;
    const seats: number = this.newWorkstationForm.value.seats;

    this.newWorkstationEvent.emit({ name: workstationName, seats: seats });
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

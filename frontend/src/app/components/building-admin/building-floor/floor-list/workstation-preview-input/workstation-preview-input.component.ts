import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

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
    allSeats: new FormControl(),
  });

  ngOnInit(): void {
    this.newWorkstationForm.reset();
  }

  onSubmit(): void {
    const workstationName: string =
      this.newWorkstationForm.value.workstation_name;
    const seats: number = this.newWorkstationForm.value.allSeats;

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

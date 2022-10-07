import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FloorService } from 'src/app/services/floor.service';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';

@Component({
  selector: 'workstation-preview-edit',
  templateUrl: './workstation-preview-edit.component.html',
  styleUrls: ['./workstation-preview-edit.component.css'],
})
export class WorkstationPreviewEditComponent {
  @Input() selectedWorkstationToEdit?: WorkstationInterface;
  @Output() showManagementEmitter = new EventEmitter();
  @Output() closePanel = new EventEmitter<boolean>();
  workstation?: WorkstationInterface;
  newWorkstationForm = new FormGroup({
    workstation_id: new FormControl(),
    workstation_name: new FormControl(),
  });

  constructor(private floorService: FloorService) {}

  onSubmit() {
    this.workstation = this.selectedWorkstationToEdit;
    this.workstation!.workstation_name =
      this.newWorkstationForm.value.workstation_name;
    this.floorService.editWorkstation(this.workstation!);
    this.goToWorkstationManagement();
  }

  goToWorkstationManagement() {
    this.showManagementEmitter.emit();
  }

  clickToClosePanel(): void {
    this.closePanel.emit(true);
  }
}

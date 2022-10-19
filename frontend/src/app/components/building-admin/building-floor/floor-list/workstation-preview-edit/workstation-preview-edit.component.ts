import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { FloorService } from 'src/app/services/floor.service';
import {
  WorkstationInterface,
  EditWorkstationInterface,
} from 'src/app/help-files/workstation-interface';

@Component({
  selector: 'workstation-preview-edit',
  templateUrl: './workstation-preview-edit.component.html',
  styleUrls: ['./workstation-preview-edit.component.css'],
})
export class WorkstationPreviewEditComponent implements OnInit {
  @Input() selectedWorkstationToEdit?: WorkstationInterface;
  @Output() showManagementEmitter = new EventEmitter();
  @Output() closePanel = new EventEmitter<boolean>();
  newWorkstationForm = new FormGroup({
    workstation_id: new FormControl(),
    workstation_name: new FormControl(),
  });

  constructor(private floorService: FloorService) {}

  ngOnInit(): void {
    this.setInitialValue(this.selectedWorkstationToEdit!);
  }

  onSubmit() {
    const workstation: EditWorkstationInterface = {
      workstation_id: this.newWorkstationForm.value.workstation_id,
      workstation_name: this.newWorkstationForm.value.workstation_name,
    };
    this.floorService.editWorkstation(workstation as EditWorkstationInterface);
    this.goToWorkstationManagement();
  }

  setInitialValue(initialWorkstation: WorkstationInterface) {
    const workstation = {
      workstation_id: initialWorkstation.workstation_id,
      workstation_name: initialWorkstation.workstation_name,
    };
    this.newWorkstationForm.setValue(workstation);
  }

  goToWorkstationManagement() {
    this.showManagementEmitter.emit();
  }

  clickToClosePanel(): void {
    this.closePanel.emit(true);
  }
}

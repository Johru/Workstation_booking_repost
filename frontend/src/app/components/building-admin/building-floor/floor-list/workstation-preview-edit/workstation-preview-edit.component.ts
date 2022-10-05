import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorService } from 'src/app/services/admin-edit/floor.service';

@Component({
  selector: 'workstation-preview-edit',
  templateUrl: './workstation-preview-edit.component.html',
  styleUrls: ['./workstation-preview-edit.component.css'],
})
export class WorkstationPreviewEditComponent implements OnInit {
  @Input() selectedWorkstationToEdit?: WorkstationInterface;
  newWorkstationForm = new FormGroup({
    workstation_id: new FormControl(),
    workstation_name: new FormControl(),
  });
  @Output() showManagementEmitter = new EventEmitter();
  @Output() closePanel = new EventEmitter<boolean>();
  workstation?: WorkstationInterface;

  constructor(private floorService: FloorService) {}

  ngOnInit(): void {}

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

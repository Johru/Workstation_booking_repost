import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {
  WorkstationInterface,
  AddWorkstationI,
} from 'src/app/help-files/workstation-interface';
import { WorkstationService } from 'src/app/services/workstation.service';
import { Observable } from 'rxjs';
import { ResponseI } from 'src/app/helpingHand/response';

@Component({
  selector: 'workstation-preview-edit',
  templateUrl: './workstation-preview-edit.component.html',
  styleUrls: ['./workstation-preview-edit.component.css'],
})
export class WorkstationPreviewEditComponent implements OnInit {
  @Input() selectedWorkstationToEdit?: WorkstationInterface;
  @Output() showManagementEmitter = new EventEmitter();
  @Output() updateEmitter = new EventEmitter<{
    update: AddWorkstationI;
    id: number;
  }>();
  @Output() closePanel = new EventEmitter<boolean>();
  newWorkstationForm = new FormGroup({
    workstation_id: new FormControl(),
    workstation_name: new FormControl(),
  });

  constructor(private workstationService: WorkstationService) {}

  ngOnInit(): void {
    this.setInitialValue(this.selectedWorkstationToEdit!);
    console.log(this.selectedWorkstationToEdit);
  }

  onSubmit() {
    const workstation: AddWorkstationI = {
      floor_id: this.selectedWorkstationToEdit!.floor_id,
      workstation_name: this.newWorkstationForm.value.workstation_name,
    };
    let obs = this.workstationService.editWorkstation(
      workstation,
      this.selectedWorkstationToEdit!.workstation_id
    );
    const id = this.selectedWorkstationToEdit!.workstation_id;

    this.handleResponse(obs, workstation, id);
    this.goToWorkstationManagement();
  }

  handleResponse(
    res: Observable<ResponseI>,
    update: AddWorkstationI,
    id: number
  ) {
    res.subscribe({
      next: (data) => {
        if (data.status == 'OK') {
          this.updateEmitter.emit({ update: update, id: id });
        } else {
          alert('Something went wrong. Workstation was not updated.');
        }
      },
      error(err: Error) {
        console.error(err);
      },
    });
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

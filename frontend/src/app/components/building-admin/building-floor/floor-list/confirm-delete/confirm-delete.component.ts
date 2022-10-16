import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
import { Success } from 'src/app/helpingHand/response';
import { FloorService } from 'src/app/services/floor.service';
import { WorkstationService } from 'src/app/services/workstation.service';

@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css'],
})
export class ConfirmDeleteComponent implements OnInit {
  @Output() cancelEmitter = new EventEmitter<boolean>();
  @Output() confirmEmitter = new EventEmitter<string>();
  @Output() successEmitter = new EventEmitter<number>();
  @Input() status?: string;
  @Input() selectedWorkstation?: WorkstationInterface;
  confirmValue: boolean = true;
  cancelValue: boolean = true;

  constructor(
    private workstationService: WorkstationService,
    private floorService: FloorService
  ) {}

  ngOnInit(): void {
    if (this.status == 'Disable') {
      if (!this.selectedWorkstation?.workstation_isactive) {
        this.status = 'Activate';
      }
    }
  }

  confirm(): void {
    console.log(this.status);

    switch (this.status) {
      case 'Delete':
        this.deleteWorkstation(this.selectedWorkstation!.workstation_id!);
        break;
      case 'Disable':
        this.disableWorkstation(this.selectedWorkstation!.workstation_id);
        break;
      case 'Activate':
        this.activateWorkstation(this.selectedWorkstation!.workstation_id);
        break;
    }
  }

  deleteWorkstation(id: number) {
    this.workstationService.deleteWorkstation(id).subscribe({
      next: (data: Success) => {
        if (data.success == 'yes') {
          this.confirmEmitter.emit(this.status);
        } else {
          alert('Something went wrong. Deletion was not successfull.');
        }
      },
      error: (e: Error) => {
        console.error(e);
      },
    });
  }

  disableWorkstation(id: number) {
    this.workstationService.disableWorkstation(id).subscribe({
      next: (data) => {
        if (data.status == 'OK') {
          this.confirmEmitter.emit(this.status);
        } else {
          alert(
            'Something went wrong. Disabling the workstation was not successfull.'
          );
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  activateWorkstation(id: number) {
    this.workstationService.activateWorkstation(id).subscribe({
      next: (data) => {
        if (data.status == 'OK') {
          this.confirmEmitter.emit(this.status);
        } else {
          alert(
            'Something went wrong. Activating the workstation was not successfull.'
          );
        }
      },
      error: (err) => {
        console.error(err);
      },
    });
  }

  cancel(): void {
    this.cancelEmitter.emit(this.cancelValue);
  }
}

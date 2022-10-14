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
  @Output() confirmEmitter = new EventEmitter<boolean>();
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
      if (!this.selectedWorkstation?.workstation_isActive) {
        this.status = 'Activate';
      }
    }
  }

  confirm(): void {
    if (this.status == 'Disable' || this.status == 'Activate') {
      this.floorService.disableWorkstation(
        this.selectedWorkstation!.workstation_id!
      );
    } else if (this.status == 'Delete') {
      this.deleteWorkstation(this.selectedWorkstation!.workstation_id!);
    }
  }

  deleteWorkstation(id: number) {
    this.workstationService.deleteWorkstation(id).subscribe({
      next: (data: Success) => {
        if (data.success == 'yes') {
          this.confirmEmitter.emit(this.confirmValue);
        } else {
          alert('Something went wrong. Deletion was not successfull.');
        }
      },
      error: (e: Error) => {
        console.error(e);
      },
    });
  }

  cancel(): void {
    this.cancelEmitter.emit(this.cancelValue);
  }
}

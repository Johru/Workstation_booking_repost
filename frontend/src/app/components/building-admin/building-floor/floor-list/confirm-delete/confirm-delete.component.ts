import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
import { FloorService } from 'src/app/services/floor.service';

@Component({
  selector: 'confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css'],
})
export class ConfirmDeleteComponent implements OnInit {
  @Output() cancelEmitter = new EventEmitter<boolean>();
  @Output() confirmEmitter = new EventEmitter<boolean>();
  @Input() status?: string;
  @Input() selectedWorkstation?: WorkstationInterface;
  confirmValue = true;
  cancelValue = true;

  constructor(private floorService: FloorService) {}

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
        this.selectedWorkstation!.workstation_id
      );
    } else if (this.status == 'Delete') {
      this.floorService.deleteWorkstation(
        this.selectedWorkstation!.workstation_id
      );
    }
    this.confirmEmitter.emit(this.confirmValue);
  }

  cancel(): void {
    this.cancelEmitter.emit(this.cancelValue);
  }
}

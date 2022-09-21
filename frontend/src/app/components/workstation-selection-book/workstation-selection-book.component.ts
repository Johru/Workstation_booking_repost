import { Component, OnInit } from '@angular/core';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';
import { WorkstationService } from 'src/app/services/workstation.service';

@Component({
  selector: 'workstation-selection-book',
  templateUrl: './workstation-selection-book.component.html',
  styleUrls: ['./workstation-selection-book.component.css'],
})
export class WorkstationSelectionBookComponent implements OnInit {
  workstations?: IWorkstation[];

  selectedWs: string | number = 'default';
  showing: boolean = false;
  confirmed?: boolean;
  canceled: boolean = false;

  wsIdAndName?: { id: number | string; name: string };
  reservationData?: any;

  constructor(private wsService: WorkstationService) {}

  ngOnInit(): void {
    this.getWsList();
  }

  getWsList() {
    this.workstations = this.wsService.getWorkstations();
  }

  showForm() {
    return this.selectedWs === 'default' ? false : true;
  }
  showReservation() {
    this.showing = !this.showing;
  }
  confirmReservation() {
    this.confirmed = !this.confirmed;
  }

  onSelection(e: { id: string | number; name: string }) {
    this.selectedWs = e.id;
    this.wsIdAndName = {
      id: e.id,
      name: e.name,
    };
  }

  onSubmit(e: any) {
    this.reservationData = e;
    this.reservationData.place = 'Input from parent';
    this.reservationData.building = 'Input from parent';
    this.reservationData.floor = 'Input from parent';
    this.reservationData.workstation = this.wsIdAndName?.name;
    this.showReservation();
  }

  onEdit(e: boolean) {
    if (e) {
      this.showReservation();
    }
  }

  onCancel(e: boolean) {
    if (e) {
      console.log(e);
      this.canceled = e;
    }
    this.showReservation();
  }
  onConfirm(e: boolean) {
    if (e) {
      this.confirmed = e;
    }
  }
}

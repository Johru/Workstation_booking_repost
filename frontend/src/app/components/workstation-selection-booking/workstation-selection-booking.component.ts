import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';
import { Reservation } from 'src/app/helpingHand/reservation';
import { WorkstationService } from 'src/app/services/workstation.service';

@Component({
  selector: 'workstation-selection-book',
  templateUrl: './workstation-selection-booking.component.html',
  styleUrls: ['./workstation-selection-booking.component.css'],
})
export class WorkstationSelectionBookingComponent
  implements OnInit, AfterContentChecked
{
  workstations?: IWorkstation[];
  selectedWorkstation: number = 0;
  modalVisibility: boolean = false;
  confirmed?: boolean;
  canceled: boolean = false;
  workstationIdAndName?: { id: number | string; name: string };
  reservationData?: Reservation;

  constructor(
    private wsService: WorkstationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.getWsList();
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }

  getWsList() {
    this.workstations = this.wsService.getWorkstations();
  }

  showForm() {
    return this.selectedWorkstation === 0 ? false : true;
  }

  showReservation() {
    this.modalVisibility = !this.modalVisibility;
  }

  confirmReservation() {
    this.confirmed = !this.confirmed;
  }

  onSelection(e: { id: number; name: string }) {
    this.selectedWorkstation = e.id;
    this.workstationIdAndName = {
      id: e.id,
      name: e.name,
    };
  }

  onBookClick(e: Reservation) {
    this.reservationData = e;
    this.reservationData.place = 'Input from parent';
    this.reservationData.building = 'Input from parent';
    this.reservationData.floor = 'Input from parent';
    this.reservationData.workstation = this.workstationIdAndName?.name;
    this.showReservation();
  }

  onEdit(e: boolean) {
    if (e) {
      this.showReservation();
    }
  }

  onCancel(e: boolean) {
    if (e) {
      this.canceled = e;
      this.showReservation();
    }
  }

  onConfirm(e: boolean) {
    if (e) {
      this.confirmed = e;
    }
  }

  canceledOnTab(e: boolean) {
    this.canceled = e;
  }
}

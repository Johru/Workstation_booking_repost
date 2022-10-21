import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/helpingHand/reservation';
import { Seat } from 'src/app/helpingHand/seat';
import { WorkstationService } from 'src/app/services/workstation.service';

@Component({
  selector: 'workstation-selection-book',
  templateUrl: './workstation-selection-booking.component.html',
  styleUrls: ['./workstation-selection-booking.component.css'],
})
export class WorkstationSelectionBookingComponent
  implements OnInit, AfterContentChecked
{
  workstations?: any[] = [];
  selectedWorkstation = 0;
  modalVisibility = false;
  confirmed?: boolean;
  canceled = false;
  workstationIdAndName?: { id: number | string; name: string };
  reservationData?: Reservation;
  selectedDate?: Date = new Date();
  seatListToSend: Seat[] = [];
  floorId = 5;
  closed = true;
  success?: boolean;

  constructor(
    private wsService: WorkstationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pushWorkstationsToLocalArray();
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }
  pushWorkstationsToLocalArray() {
    this.getWsList().subscribe(data => {
      for (const item of data) {
        this.workstations?.push(item);
      }
    });
  }

  getWsList(): Observable<any> {
    return this.wsService.getWorkstations(this.floorId);
  }

  receiveDateToPushSeats(requestedDate: Date) {
    this.selectedDate = requestedDate;
    this.pushSeatsToLocalArray();
  }

  pushSeatsToLocalArray() {
    this.seatListToSend = [];
    const reservationDate = new Date(
      this.selectedDate!.getTime() -
        this.selectedDate!.getTimezoneOffset() * 60000
    )
      .toISOString()
      .split('T')[0];

    this.getSeats(this.selectedWorkstation, reservationDate!).subscribe(
      data => {
        for (const item of data) {
          let date: string | null = '';
          let name: string | null = '';
          if (!item.reservation[0]) {
            date = null;
            name = null;
          } else {
            date = item.reservation[0].reservation_date;
            name = item.reservation[0].user.user_name;
          }

          const seatToPush = {
            seat_id: item.seat_id,
            workstation_id: item.workstation_id,
            reservation_date: date!,
            user_name: name!,
          };

          this.seatListToSend.push(seatToPush);
        }
      }
    );
  }

  getSeats(workstationId: number, reservationDate: string): Observable<any> {
    return this.wsService.getSeats(workstationId, reservationDate);
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

  onConfirm(e: boolean[]) {
    if (e) {
      this.confirmed = e[0];
      this.success = e[1];
    }
    this.closed = false;
  }

  canceledOnTab(e: boolean) {
    this.canceled = e;
  }

  closeModal(): void {
    this.closed = true;
    this.modalVisibility = false;
    this.confirmed = false;
    this.pushSeatsToLocalArray();
  }
}

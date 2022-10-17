import {
  AfterContentChecked,
  ChangeDetectorRef,
  Component,
  OnInit,
  Input,
} from '@angular/core';
import { Observable } from 'rxjs';
import { Reservation } from 'src/app/helpingHand/reservation';
import { Seat } from 'src/app/helpingHand/seat';
import { ReservationService } from 'src/app/services/reservation.service';
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
  selectedWorkstation: number = 0;
  modalVisibility: boolean = false;
  confirmed?: boolean;
  canceled: boolean = false;
  workstationIdAndName?: { id: number | string; name: string };
  reservationData?: Reservation;
  selectedDate?: Date = new Date();
  seatListToSend: Seat[] = [];
  floorId = 5;
  closed: boolean = true;

  constructor(
    private wsService: WorkstationService,
    private resService: ReservationService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.pushWorkstationsToLocalArray();
  }

  ngAfterContentChecked(): void {
    this.cd.detectChanges();
  }
  pushWorkstationsToLocalArray() {
    this.getWsList().subscribe((data) => {
      for (let item of data) {
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
      (data) => {
        for (let item of data) {
          let date: string | null = '';
          let name: string | null = '';
          if (!item.reservation[0]) {
            date = null;
            name = null;
          } else {
            date = item.reservation[0].reservation_date;
            name = item.reservation[0].user.user_name;
          }

          let seatToPush = {
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
    this.reservationData.place = 'Inherit';
    this.reservationData.building = 'Inherit';
    this.reservationData.floor = 'Inherit';
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

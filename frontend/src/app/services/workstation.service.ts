import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';
import { environment } from 'src/environments/environment';
import {
  AddWorkstationI,
  WorkstationInterface,
} from '../help-files/workstation-interface';
import { Seat } from '../helpingHand/seat';
import { SEATS } from '../helpingHand/seat-data';
import { ResponseI, Success } from '../helpingHand/response';
import { WORKSTATIONLIST } from '../helpingHand/workstation-data';

@Injectable({
  providedIn: 'root',
})
export class WorkstationService {
  constructor(private http: HttpClient) {}

  getWorkstations(): IWorkstation[] {
    return WORKSTATIONLIST;
  }

  getSeats(): Seat[] {
    return SEATS;
  }

  addWorkstation(
    workstation: AddWorkstationI,
    seats: number
  ): Observable<ResponseI> {
    return this.http.post<ResponseI>(
      environment.rootPath + `/api/workstation/create/${seats}`,
      workstation
    );
  }

  deleteWorkstation(id: number): Observable<Success> {
    return this.http.delete<Success>(
      environment.rootPath + `/api/workstation/${id}/delete`
    );
  }
}

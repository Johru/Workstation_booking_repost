import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorkstationService {
  constructor(private http: HttpClient) {}

  getWorkstations(floorId: number): Observable<IWorkstation> {
    const path = `http://localhost:8080/api/workstation/${floorId}/showonfloor`;
    return this.http.get<IWorkstation>(path);
  }

  getSeats(workstationId: number, reservationDate: string): Observable<any> {
    const path = `http://localhost:8080/api/reservation/${workstationId}/date/?reservation_date=${reservationDate}`;
    return this.http.get<any>(path);
  }
}

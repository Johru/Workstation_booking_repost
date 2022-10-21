import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IWorkstation } from 'src/app/helpingHand/iworkstation';
import { environment } from 'src/environments/environment';
import { AddWorkstationI } from '../help-files/workstation-interface';
import { ResponseI, Success } from '../helpingHand/response';

@Injectable({
  providedIn: 'root',
})
export class WorkstationService {
  constructor(private http: HttpClient) {}

  getWorkstations(floorId: number): Observable<IWorkstation> {
    const path =
      environment.rootPath + `/api/workstation/${floorId}/showonfloor`;
    return this.http.get<IWorkstation>(path);
  }

  getSeats(workstationId: number, reservationDate: string): Observable<any> {
    const path =
      environment.rootPath +
      `/api/reservation/${workstationId}/date/?reservation_date=${reservationDate}`;
    return this.http.get<any>(path);
  }

  locateWorkstation(workstationId: number): Observable<any> {
    const path =
      environment.rootPath + `/api/workstation/${workstationId}/locate`;
    return this.http.get<any>(path);
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

  deleteWorkstation(id: number): Observable<any> {
    return this.http.delete<any>(
      environment.rootPath + `/api/workstation/${id}/delete`
    );
  }

  editWorkstation(
    workstation: AddWorkstationI,
    id: number
  ): Observable<ResponseI> {
    return this.http.put<ResponseI>(
      environment.rootPath + `/api/workstation/${id}/update`,
      workstation
    );
  }

  disableWorkstation(id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(
      environment.rootPath + `/api/workstation/${id}/notactive`,
      null
    );
  }

  activateWorkstation(id: number): Observable<ResponseI> {
    return this.http.put<ResponseI>(
      environment.rootPath + `/api/workstation/${id}/active`,
      null
    );
  }
}

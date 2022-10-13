import { Injectable } from '@angular/core';
import { Floor } from 'src/app/help-files/floor-interface';
import { FLOORS } from 'src/app/help-files/floor-data';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  wsId: number = 100;

  AjD: string = '10';

  private floorApiUrl = `http://localhost:8080/api/building-floor?buildingId=${this.AjD}`;
  httpHeader = {
    headers: new HttpHeaders({
      'Content-type': 'application/json',
    }),
  };

  constructor(private http: HttpClient) {}

  getFloor(): Observable<Floor[]> {
    // return FLOORS;
    return this.http.get<Floor[]>(this.floorApiUrl);
  }

  addFloor(floor: Floor): Observable<Floor> {
    // FLOORS.push(floor);
    return this.http.post<Floor>(this.floorApiUrl, floor, this.httpHeader);
  }

  deleteWorkstation(id: number) {
    for (let i: number = 0; i < FLOORS.length; i++) {
      let ws = FLOORS[i].workstations.find(
        (workstation) => workstation.workstation_id == id
      );
      if (ws != undefined) {
        let index = FLOORS[i].workstations.indexOf(ws!);
        if (index != -1) {
          FLOORS[i].workstations.splice(index, 1);
        }
      }
    }
  }

  disableWorkstation(id: number) {
    for (let i: number = 0; i < FLOORS.length; i++) {
      let ws = FLOORS[i].workstations.find(
        (workstation) => workstation.workstation_id == id
      );
      let index = FLOORS[i].workstations.indexOf(ws!);
      if (index != -1) {
        let status = FLOORS[i].workstations[index].workstation_isActive;
        if (status) {
          FLOORS[i].workstations[index].workstation_isActive = false;
        } else {
          FLOORS[i].workstations[index].workstation_isActive = true;
        }
      }
    }
  }

  editWorkstation(workstation: WorkstationInterface) {
    let id = workstation.workstation_id;
    for (let i: number = 0; i < FLOORS.length; i++) {
      let ws = FLOORS[i].workstations.find(
        (workstation) => workstation.workstation_id == id
      );
      let index = FLOORS[i].workstations.indexOf(ws!);
      if (index != -1) {
        FLOORS[i].workstations[index].workstation_name =
          workstation.workstation_name;
      }
    }
  }

  floorId(): number {
    let id = FLOORS[FLOORS.length - 1].floor_id + 1;
    return id;
  }

  workstationId(): number {
    let nr = (this.wsId = this.wsId + 1);
    return nr;
  }
}

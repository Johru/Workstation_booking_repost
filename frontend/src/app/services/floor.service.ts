import { Injectable } from '@angular/core';
import { Floor } from 'src/app/help-files/floor-interface';
import { FLOORS } from 'src/app/help-files/floor-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Success } from '../helpingHand/response';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  wsId: number = 100;

  constructor(private http: HttpClient) {}

  getFloor(buildingId: number): Observable<Floor[]> {
    const getFloorUrl =
      environment.rootPath + `/api/building-floor/?buildingId=${buildingId}`;
    // return FLOORS;
    return this.http.get<Floor[]>(getFloorUrl);
  }

  addFloor(floor: Floor): Observable<Floor> {
    // FLOORS.push(floor);
    const addFloorUrl = environment.rootPath + `/api/floor/create`;
    return this.http.post<Floor>(addFloorUrl, floor);
  }

  disableWorkstation(id: number) {
    for (let i: number = 0; i < FLOORS.length; i++) {
      let ws = FLOORS[i].workstation.find(
        (workstation) => workstation.workstation_id == id
      );
      let index = FLOORS[i].workstation.indexOf(ws!);
      if (index != -1) {
        let status = FLOORS[i].workstation[index].workstation_isactive;
        if (status) {
          FLOORS[i].workstation[index].workstation_isactive = false;
        } else {
          FLOORS[i].workstation[index].workstation_isactive = true;
        }
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

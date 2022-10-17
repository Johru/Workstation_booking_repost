import { Injectable } from '@angular/core';
import {
  AddFloor,
  Floor,
  FloorResponse,
} from 'src/app/help-files/floor-interface';
import { FLOORS } from 'src/app/help-files/floor-data';
import { EditWorkstationInterface } from 'src/app/help-files/workstation-interface';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

  addFloor(floor: AddFloor, buildingId: number): Observable<FloorResponse> {
    // FLOORS.push(floor);
    const addFloorUrl =
      environment.rootPath + `/api/floor/create/?buildingId=${buildingId}`;
    return this.http.post<FloorResponse>(addFloorUrl, floor);
  }

  deleteWorkstation(id: number) {
    for (let i: number = 0; i < FLOORS.length; i++) {
      let ws = FLOORS[i].workstation.find(
        (workstation) => workstation.workstation_id == id
      );
      if (ws != undefined) {
        let index = FLOORS[i].workstation.indexOf(ws!);
        if (index != -1) {
          FLOORS[i].workstation.splice(index, 1);
        }
      }
    }
  }

  disableWorkstation(id: number) {
    for (let i: number = 0; i < FLOORS.length; i++) {
      let ws = FLOORS[i].workstation.find(
        (workstation) => workstation.workstation_id == id
      );
      let index = FLOORS[i].workstation.indexOf(ws!);
      if (index != -1) {
        let status = FLOORS[i].workstation[index].workstation_isActive;
        if (status) {
          FLOORS[i].workstation[index].workstation_isActive = false;
        } else {
          FLOORS[i].workstation[index].workstation_isActive = true;
        }
      }
    }
  }

  editWorkstation(workstation: EditWorkstationInterface) {
    let id = workstation.workstation_id;
    for (let i: number = 0; i < FLOORS.length; i++) {
      let ws = FLOORS[i].workstation.find(
        (workstation) => workstation.workstation_id == id
      );
      let index = FLOORS[i].workstation.indexOf(ws!);
      if (index != -1) {
        FLOORS[i].workstation[index].workstation_name =
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

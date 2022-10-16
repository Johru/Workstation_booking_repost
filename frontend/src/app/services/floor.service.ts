import { Injectable } from '@angular/core';
import { Floor } from 'src/app/help-files/floor-interface';
import { FLOORS } from 'src/app/help-files/floor-data';
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

  addFloor(floor: Floor): Observable<Floor> {
    // FLOORS.push(floor);
    const addFloorUrl = environment.rootPath + `/api/floor/create`;
    return this.http.post<Floor>(addFloorUrl, floor);
  }

  floorId(): number {
    let id = FLOORS[FLOORS.length - 1].floor_id + 1;
    return id;
  }
}

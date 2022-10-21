import { Injectable } from '@angular/core';
import {
  AddFloor,
  Floor,
  FloorResponse,
} from 'src/app/help-files/floor-interface';
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
    return this.http.get<Floor[]>(getFloorUrl);
  }

  addFloor(floor: AddFloor, buildingId: number): Observable<FloorResponse> {
    const addFloorUrl =
      environment.rootPath + `/api/floor/create/?buildingId=${buildingId}`;
    return this.http.post<FloorResponse>(addFloorUrl, floor);
  }
}

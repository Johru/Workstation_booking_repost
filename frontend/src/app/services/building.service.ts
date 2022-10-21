import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from '../helpingHand/buidling';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor(private http: HttpClient) {}

  getCityList(): Observable<Building> {
    return this.http.get<Building>(
      environment.rootPath + `/api/building/cities`
    );
  }

  getBuildings(): Observable<Building> {
    return this.http.get<Building>(environment.rootPath + `/api/building`);
  }
}

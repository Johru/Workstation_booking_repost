import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from '../helpingHand/buidling';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor(private http: HttpClient) {}

  getCityList(): Observable<Building> {
    return this.http.get<Building>(`http://localhost:8080/api/building/cities`);
  }

  getBuildings(): Observable<Building> {
    return this.http.get<Building>(`http://localhost:8080/api/building`);
  }
}

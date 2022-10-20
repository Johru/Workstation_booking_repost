import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Building } from '../help-files/buildind-interface';
import { BUILDINGS } from '../help-files/building-data';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor(private http: HttpClient) {}

  addBuilding(newBuilding: Building): any {
    return this.http.post(
      `http://localhost:8080/api/building/new`,
      newBuilding
    );
  }

  getBuilding(id: number): Observable<Building> {
    return this.http.get<Building>(`http://localhost:8080/api/building/${id}`);
  }

  buildingId(): number {
    const id = BUILDINGS[BUILDINGS.length - 1].building_id + 1;
    return id;
  }

  editBuilding(id: number, updatedValues: Building) {
    return this.http
      .put(`http://localhost:8080/api/building/${id}/edit`, updatedValues)
      .subscribe();
  }
}

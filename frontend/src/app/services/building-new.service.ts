import { Injectable } from '@angular/core';
import { Building } from '../helpingHand/buidling';
import { BUILDINGS } from '../help-files/building-data';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BuildingNewService {
  constructor(private http: HttpClient) {}

  addBuilding(building: Building): void {
    BUILDINGS.push(building);
  }

  getBuilding(id: number): Observable<Building> {
    return this.http.get<Building>(`http://localhost:8080/api/building/${id}`);
  }

  buildingId(): number {
    const id = BUILDINGS[BUILDINGS.length - 1].building_id + 1;
    return id;
  }

  editBuilding(updatedBuilding: Building) {
    const buildingIndex = BUILDINGS.findIndex(
      building => building.building_id === updatedBuilding.building_id
    );
    BUILDINGS[buildingIndex] = updatedBuilding;
  }
}

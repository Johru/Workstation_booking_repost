import { Injectable } from '@angular/core';

import { Building } from '../../help-files/buildind-interface';
import { BUILDINGS } from '../../help-files/building-data';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor() {}

  getBuildings(): Building[] {
    return BUILDINGS;
  }

  addBuilding(building: Building): void {
    BUILDINGS.push(building);
  }

  getBuilding(id: number) {
    return BUILDINGS.find((building) => building.building_id === id);
  }
}

import { Injectable } from '@angular/core';
import { Building } from '../help-files/building-interface';
import { BUILDINGS } from '../help-files/building-data';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor() {}

  addBuilding(building: Building): void {
    BUILDINGS.push(building);
  }

  getBuilding(id: number) {
    return BUILDINGS.find((building) => building.building_id === id);
  }

  buildingId(): number {
    const id = BUILDINGS[BUILDINGS.length - 1].building_id + 1;
    return id;
  }

  editBuilding(updatedBuilding: Building) {
    const buildingIndex = BUILDINGS.findIndex(
      (building) => building.building_id === updatedBuilding.building_id
    );
    BUILDINGS[buildingIndex] = updatedBuilding;
  }
}

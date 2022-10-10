import { Injectable } from '@angular/core';
import { Building } from '../help-files/buildind-interface';
import { BUILDINGS } from '../help-files/building-data';

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

  buildingId(): number {
    let id = BUILDINGS[BUILDINGS.length - 1].building_id + 1;
    return id;
  }

  editBuilding(building: Building) {
    let id = building.building_id;
    BUILDINGS[id].building_address = building.building_address;
    BUILDINGS[id].building_name = building.building_name;
    BUILDINGS[id].building_state = building.building_state;
    BUILDINGS[id].building_zip = building.building_zip;
    BUILDINGS[id].building_city = building.building_city;
    BUILDINGS[id].building_image = building.building_image;
  }
}

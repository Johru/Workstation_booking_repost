import { Injectable } from '@angular/core';
import { BUILDINGLIST, CITYLIST } from '../helpingHand/building-data';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor() {}

  getCityList() {
    return CITYLIST;
  }

  getBuildings() {
    return BUILDINGLIST;
  }
}

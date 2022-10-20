import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BUILDINGLIST, CITYLIST } from '../helpingHand/building-data';

@Injectable({
  providedIn: 'root',
})
export class BuildingService {
  constructor(private http: HttpClient) {}

  getCityList() {
    return CITYLIST;
  }

  getBuildings() {
    return BUILDINGLIST;
  }
}

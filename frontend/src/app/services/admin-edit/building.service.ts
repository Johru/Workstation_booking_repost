import { Injectable } from '@angular/core';
// import { Observable, of } from 'rxjs';

import { Building } from '../../help-files/buildind-interface';
import { BUILDINGS } from '../../help-files/building-data';

@Injectable({
  providedIn: 'root'
})
export class BuildingService {

  constructor() { }

  getBuildings(): Building[] {
    return BUILDINGS;
  }

  addBuilding(building: Building): void {
    BUILDINGS.push(building);
  }

  // getId(id: number): Observable<Building> {    
  //   const getId = BUILDINGS.find(h => h.id === id)!;
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(hero);
  // }
}

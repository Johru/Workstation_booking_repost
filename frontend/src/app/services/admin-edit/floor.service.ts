import { Injectable } from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';
import { FLOORS } from 'src/app/help-files/floor-data';

@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor() { }

  getFloor(): Floor[] {
    return FLOORS;
  }

  getWorkstation(): Floor[] {
    return FLOORS;
  }

  addFloor(floor: Floor): void {
    FLOORS.push(floor);
  }

  addWorkstation(workstation: Floor): void {
    FLOORS.push(workstation);
  }


}

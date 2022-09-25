import { Injectable } from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';
import { FLOORS } from 'src/app/help-files/floor-data';
import { Workstation } from 'src/app/help-files/workstation-interface';
import { WORKSTATIONS } from 'src/app/help-files/workstation-data';



@Injectable({
  providedIn: 'root'
})
export class FloorService {

  constructor() { }

  getFloor(): Floor[] {
    return FLOORS;
  }

  getWorkstation(): Workstation[] {
    return WORKSTATIONS;
  }

  addFloor(floor: Floor): void {
    FLOORS.push(floor);
  }

  addWorkstation(workstation: Workstation): void {
    WORKSTATIONS.push(workstation);
  }


}

import { Injectable } from '@angular/core';

import { Floor } from 'src/app/help-files/floor-interface';
import { FLOORS } from 'src/app/help-files/floor-data';
import { WorkstationInterface } from 'src/app/help-files/workstation-interface';

@Injectable({
  providedIn: 'root',
})
export class FloorService {
  constructor() {}

  getFloor(): Floor[] {
    return FLOORS;
  }

  addFloor(floor: Floor): void {
    FLOORS.push(floor);
  }

  addWorkstation(workstation: Floor): void {
    FLOORS.push(workstation);
  }

  deleteWorkstation(id: number) {
    console.log('service'); //DEL
    console.log(FLOORS); //DEL
    for (let i: number = 0; i < FLOORS.length; i++) {
      let ws = FLOORS[i].workstations.find(
        (workstation) => workstation.workstation_id == id
      );
      if (ws != undefined) {
        let index = FLOORS[i].workstations.indexOf(ws!);
        if (index != -1) {
          FLOORS[i].workstations.splice(index, 1);
        }
      }
    }
    console.log(FLOORS); //DEL
  }

  disableWorkstation(id: number) {
    for (let i: number = 0; i < FLOORS.length; i++) {
      let ws = FLOORS[i].workstations.find(
        (workstation) => workstation.workstation_id == id
      );
      let index = FLOORS[i].workstations.indexOf(ws!);
      if (index != -1) {
        let status = FLOORS[i].workstations[index].workstation_isActive;
        if (status) {
          FLOORS[i].workstations[index].workstation_isActive = false;
        } else {
          FLOORS[i].workstations[index].workstation_isActive = true;
        }
      }
    }
  }

  editWorkstation(workstation: WorkstationInterface) {
    let id = workstation.workstation_id;
    for (let i: number = 0; i < FLOORS.length; i++) {
      let ws = FLOORS[i].workstations.find(
        (workstation) => workstation.workstation_id == id
      );
      let index = FLOORS[i].workstations.indexOf(ws!);
      if (index != -1) {
        FLOORS[i].workstations[index].workstation_name =
          workstation.workstation_name;
      }
    }
  }

  floorId(): number {
    let id = FLOORS[FLOORS.length - 1].floor_id + 1;
    return id;
  }
}

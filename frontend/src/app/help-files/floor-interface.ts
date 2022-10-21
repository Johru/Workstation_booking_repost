import { WorkstationInterface } from './workstation-interface';

export interface Floor {
  floor_id: number;
  floor_name: string;
  workstation: WorkstationInterface[];
}

export interface AddFloor {
  building_id: number;
  floor_name: string;
}

export interface FloorResponse {
  status: string;
  message: string;
  floor?: Floor;
}

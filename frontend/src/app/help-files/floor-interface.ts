import { WorkstationInterface } from "./workstation-interface"

export interface Floor {
  floor_id: number;
  floor_name: string;
  workstations: WorkstationInterface[];
  workstationsCount: number;
  seatsCount: number;
  // floor_plan: string;
}
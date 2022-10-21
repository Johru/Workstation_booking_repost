export interface WorkstationInterface {
  workstation_id: number;
  floor_id: number;
  workstation_name: string;
  workstation_isactive: boolean;
  allSeats: number;
}

export interface AddWorkstationI {
  floor_id?: number;
  workstation_name: string;
}

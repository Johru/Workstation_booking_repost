export interface WorkstationInterface {
  workstation_id: number;
  workstation_name: string;
  workstation_isActive?: boolean;
  allSeats: number;
}

export interface EditWorkstationInterface {
  workstation_id: number;
  workstation_name: string;
}

export interface AddWorkstationI {
  floor_id?: number;
  workstation_name: string;
}

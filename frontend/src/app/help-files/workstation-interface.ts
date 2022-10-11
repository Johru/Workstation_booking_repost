export interface WorkstationInterface {
  workstation_id: number;
  workstation_name: string;
  seats: number;
  workstation_isActive: boolean;
}

export interface EditWorkstationInterface {
  workstation_id: number;
  workstation_name: string;
}

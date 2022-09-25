interface WorkstationInterface {
  // workstation_id: number;
  workstation_name: string; 
  seats: number;
}

export interface Floor {
  floor_id: number;
  floor_name: string;
  workstations: WorkstationInterface[];

  // floor_capacity: number;
	// floor_plan: string;
}
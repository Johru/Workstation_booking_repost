import { Floor } from "./floor-interface";

export const FLOORS: Floor[] = [
	{
		floor_id: 1,
		floor_name: 'A 1',		
		workstations: [
			{ workstation_name: 'management 1', seats: 5 },
			{ workstation_name: 'management 2', seats: 6 },
			{ workstation_name: 'management 3', seats: 7 },
		]
	},
	{
		floor_id: 2,
		floor_name: 'A 2',
		workstations: [
			{ workstation_name: 'IT 1', seats: 5 },
			{ workstation_name: 'IT 2', seats: 6 },
			{ workstation_name: 'IT 3', seats: 7 },
		]
	},
	{
		floor_id: 3,
		floor_name: 'A 3',
		workstations: [
			{ workstation_name: 'kitchen 1', seats: 4 },
			{ workstation_name: 'kitchen 2', seats: 4 }
		]
	},
	{
		floor_id: 3,
		floor_name: 'A 4',
		workstations: [
		]
	}
]

import { Floor } from "./floor-interface";

export const FLOORS: Floor[] = [
	{
		floor_id: 1,
		floor_name: 'A 1',
		workstationsCount: 3,
		seatsCount: 10,		//REMOVE
		workstations: [
			{ workstation_name: 'management 1', seats: 5, workstation_isActive: true, },
			{ workstation_name: 'management 2', seats: 6, workstation_isActive: true, },
			{ workstation_name: 'management 3', seats: 7, workstation_isActive: true, },
		]
	},
	{
		floor_id: 2,
		floor_name: 'A 2',
		workstationsCount: 6,
		seatsCount: 22,
		workstations: [
			{ workstation_name: 'IT 1', seats: 5, workstation_isActive: true, },
			{ workstation_name: 'IT 2', seats: 6, workstation_isActive: true, },
			{ workstation_name: 'IT 3', seats: 7, workstation_isActive: true, },
		]
	},
	{
		floor_id: 3,
		floor_name: 'A 3',
		workstationsCount: 4,
		seatsCount: 12,
		workstations: [
			{ workstation_name: 'kitchen 1', seats: 4, workstation_isActive: true, },
			{ workstation_name: 'kitchen 2', seats: 4, workstation_isActive: true, },
			{ workstation_name: 'kitchen 3', seats: 4, workstation_isActive: true, }
		]
	},
	{
		floor_id: 4,
		floor_name: 'A 4',
		workstationsCount: 0,
		seatsCount: 0,
		workstations: [
		]
	}
]

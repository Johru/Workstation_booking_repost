import { Floor } from './floor-interface';

export const FLOORS: Floor[] = [
  {
    floor_id: 1,
    floor_name: 'A 1',
    workstations: [
      {
        workstation_id: 10,
        workstation_name: 'management 1',
        seats: 5,
        workstation_isActive: true,
      },
      {
        workstation_id: 11,
        workstation_name: 'management 2',
        seats: 6,
        workstation_isActive: true,
      },
      {
        workstation_id: 12,
        workstation_name: 'management 3',
        seats: 7,
        workstation_isActive: true,
      },
    ],
  },
  {
    floor_id: 2,
    floor_name: 'A 2',
    workstations: [
      {
        workstation_id: 21,
        workstation_name: 'IT 1',
        seats: 5,
        workstation_isActive: true,
      },
      {
        workstation_id: 22,
        workstation_name: 'IT 2',
        seats: 6,
        workstation_isActive: true,
      },
      {
        workstation_id: 23,
        workstation_name: 'IT 3',
        seats: 7,
        workstation_isActive: true,
      },
    ],
  },
  {
    floor_id: 3,
    floor_name: 'A 3',
    workstations: [
      {
        workstation_id: 30,
        workstation_name: 'kitchen 1',
        seats: 4,
        workstation_isActive: true,
      },
      {
        workstation_id: 31,
        workstation_name: 'kitchen 2',
        seats: 4,
        workstation_isActive: true,
      },
      {
        workstation_id: 32,
        workstation_name: 'kitchen 3',
        seats: 4,
        workstation_isActive: true,
      },
    ],
  },
  {
    floor_id: 4,
    floor_name: 'A 4',
    workstations: [],
  },
];

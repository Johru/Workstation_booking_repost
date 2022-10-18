export interface AdminReservation {
  id: number;
  res_date: string;
  building_name: string;
  building_address: string;
  floor_name: string;
  workstation_name: string;
  seat_id: number;
}

export const ADMINRESERVATIONLIST: AdminReservation[] = [
  {
    id: 1,
    res_date: '2022-09-19',
    building_name: 'Office Home',
    building_address: 'Bratislava, Kosicka 1',
    floor_name: 'first floor',
    workstation_name: 'HR',
    seat_id: 58,
  },
  {
    id: 2,
    res_date: '2022-09-19',
    building_name: 'Building 2',
    building_address: 'City, street 1',
    floor_name: 'first floor',
    workstation_name: 'HR',
    seat_id: 58,
  },
  {
    id: 3,
    res_date: '2022-09-19',
    building_name: 'Building 3',
    building_address: 'City, street 1',
    floor_name: 'first floor',
    workstation_name: 'HR',
    seat_id: 58,
  },
  {
    id: 4,
    res_date: '2022-09-19',
    building_name: 'Building 4',
    building_address: 'City, street 1',
    floor_name: 'first floor',
    workstation_name: 'HR',
    seat_id: 58,
  },
  {
    id: 5,
    res_date: '2022-09-19',
    building_name: 'Building 5',
    building_address: 'City, street 1',
    floor_name: 'first floor',
    workstation_name: 'HR',
    seat_id: 58,
  },
];

export interface AdminReservation {
  reservation_id: number;
  user_id: number;
  seat_id: number;
  reservation_date: string;
  workstation_name: string;
  floor_name: string;
  building_name: string;
  building_address: string;
}
<<<<<<< HEAD
=======

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
>>>>>>> development

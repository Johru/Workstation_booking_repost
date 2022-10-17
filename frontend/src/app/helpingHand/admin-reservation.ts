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

export interface Reservation {
  seat_id: number;
  reservation_date: string;
  user_id: number;
  place?: string;
  building_name?: string;
  building_address?: string;
  workstation_name?: string;
  floor_name?: string;
  floor?: string;
  workstation?: string;
}

export interface Reservation {
  seat_id: number;
  reservation_date: string;
  user_id: number;
  place?: string;
  building?: string;
  floor?: string;
  workstation?: string;
}

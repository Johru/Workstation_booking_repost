export interface Building {
  building_id: number;
  building_name: string;
  building_address: string;
  building_city: string;
  building_zip: string;
  building_country: string;
  building_image: string;
  floorCount?: number;
  seatCount?: number;
}

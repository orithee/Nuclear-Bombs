export interface Officer {
  name: string;
  army_identity_number: number;
  email: string;
  phone_number: number;
}

export interface Nuclear {
  model: string;
  quantity: string;
  size: number;
  manufacturing_year: number;
  location_id: number;
  officer_id: number;
}

export interface NewLocationHistory {
  arrival_date: number;
  departure_date: number;
  location_id: number;
  bomb_id: number;
}

export interface NewLocation {
  lat: number;
  lon: number;
  base_name: string;
  nearest_city: string;
}

export interface Update {
  columnSet: string;
  valueSet: string;
  columnCondition: string;
  valueCondition: string;
  table: string;
}

export interface Delete {
  columnCondition: string;
  valueCondition: string;
  table: string;
}

export const formsData = [
  {
    idString: 'new-bomb',
    inputsNames: [
      'model',
      'quantity',
      'size',
      'manufacturing_year',
      'location_id',
      'officer_id',
    ],
  },
  {
    idString: 'new-officer',
    inputsNames: ['name', 'army_identity_number', 'email', 'phone_number'],
  },
  {
    idString: 'new-location',
    inputsNames: ['lat', 'lon', 'base_name', 'nearest_city'],
  },
  {
    idString: 'new-locations_history',
    inputsNames: ['arrival_date', 'departure_date', 'location_id', 'bomb_id'],
  },
  {
    idString: 'delete',
    inputsNames: ['columnCondition', 'valueCondition'],
  },
  {
    idString: 'update',
    inputsNames: ['columnSet', 'valueSet', 'columnCondition', 'valueCondition'],
  },
];

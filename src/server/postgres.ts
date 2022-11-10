import { client } from './createDB';
import {
  Officer,
  Nuclear,
  NewLocation,
  Update,
  Delete,
  NewLocationHistory,
} from './interfaces';

// Functions that create a new row:
export async function createNewOfficer(officer: Officer) {
  // Create a new officer.
  const insertNewOfficer =
    'INSERT INTO officers (name, army_identity_number, email, phone_number) VALUES ($1, $2, $3, $4);';
  const values = [
    officer.name,
    Number(officer.army_identity_number),
    officer.email,
    officer.phone_number,
  ];
  await client.query(insertNewOfficer, values);
  console.log('Finish createNewOfficer function');
}

export async function createNewNuclear(nuclear: Nuclear) {
  // Create a new nuclear.
  const insertNewNuclear =
    'INSERT INTO bombs (model, quantity, size, manufacturing_year, location_id, officer_id) VALUES ($1, $2, $3, $4 ,$5, $6);';
  const values = [
    nuclear.model,
    nuclear.quantity,
    nuclear.size,
    nuclear.manufacturing_year,
    nuclear.location_id,
    nuclear.officer_id,
  ];
  await client.query(insertNewNuclear, values);
  console.log('Finish insertNewNuclear function');
}

export async function createNewLocationHistory(
  LocationHistory: NewLocationHistory
) {
  // Create a new location history.
  const insertNewLocationHistory =
    'INSERT INTO locations_history (arrival_date, departure_date, location_id, bomb_id) VALUES ($1, $2, $3, $4);';
  const values = [
    LocationHistory.arrival_date,
    LocationHistory.departure_date,
    LocationHistory.location_id,
    LocationHistory.bomb_id,
  ];
  await client.query(insertNewLocationHistory, values);
  console.log('Finish createNewLocationHistory function');
}

export async function createNewLocation(newLocation: NewLocation) {
  // Create a new location.
  const insertNewLocation =
    'INSERT INTO locations (lat, lon, base_name, nearest_city) VALUES ($1, $2, $3, $4);';
  const values = [
    newLocation.lat,
    newLocation.lon,
    newLocation.base_name,
    newLocation.nearest_city,
  ];
  await client.query(insertNewLocation, values);
  console.log('Finish createNewLocation function');
}

// Functions that update / delete row:
export async function updateRows(updateData: Update) {
  // Function that update rows.
  const update = `UPDATE ${updateData.table} SET ${updateData.columnSet}='${updateData.valueSet}'`;
  const condition = `WHERE ${updateData.columnCondition} = '${updateData.valueCondition}' RETURNING *;`;
  const sql = update + condition;
  try {
    return await new Promise<any>(async (resolve, reject) => {
      return client.query(sql, (err, res) => {
        if (err) {
          const message = err.toString().split('\n', 1).join('');
          reject(message);
        } else {
          if (res.rows.length === 0) resolve('No information has been updated');
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.log('catch: ' + error);
    return error;
  }
}

export async function deleteRows(deleteData: Delete) {
  // Function that delete rows.
  const deleteStr = `DELETE FROM ${deleteData.table} `;
  const conditionStr = `WHERE ${deleteData.columnCondition} = '${deleteData.valueCondition}' RETURNING *;`;
  const sql = deleteStr + conditionStr;
  try {
    return await new Promise<any>((resolve, reject) => {
      client.query(sql, (err, res) => {
        if (err) {
          const message = err.toString().split('\n', 1).join('');
          reject(message);
        } else {
          if (res.rows.length === 0) resolve('No information has been deleted');
          resolve(true);
        }
      });
    });
  } catch (error) {
    console.log('catch: ' + error);
    return error;
  }
}

// Function that get all data from specific table:
export async function getAllDataTable(tableName: string) {
  if (tableName === 'locations_history') return getLocationsHistoryData();
  else if (tableName === 'bombs') return getBombsData();
  const sql = `SELECT * from ${tableName};`;

  return new Promise<any[]>((resolve, reject) => {
    client.query(sql, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        resolve(res.rows);
      }
    });
  });
}

// A function that checks whether the data from the client matches:
export async function CheckIfExist(
  tableName: string,
  column: string,
  value: string
) {
  const sql = `SELECT * from ${tableName} WHERE ${column}=${value};`;
  return new Promise<boolean>((resolve, reject) => {
    client.query(sql, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        if (res.rows.length === 0) resolve(false);
        else resolve(true);
      }
    });
  });
}

// Function that get all data from 'LocationsHistory' table:
async function getLocationsHistoryData() {
  const sql = `SELECT location_history_id, 
  to_char(arrival_date,'DD-MM-YYYY') as arrival_date,
  to_char(departure_date,'DD-MM-YYYY') as departure_date,
  location_id,
  bomb_id 
  from locations_history;`;

  return new Promise<any[]>((resolve, reject) => {
    client.query(sql, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        resolve(res.rows);
      }
    });
  });
}

// Function that get all data from 'Bombs' table:
async function getBombsData() {
  const sql = `SELECT bomb_id, 
  model, 
  quantity, 
  size, 
  to_char(manufacturing_year,'DD-MM-YYYY') as manufacturing_year,
  location_id,
  officer_id 
  from bombs;`;
  return new Promise<any[]>((resolve, reject) => {
    client.query(sql, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        resolve(res.rows);
      }
    });
  });
}

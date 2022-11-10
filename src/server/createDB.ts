import { Client } from 'pg';
import dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({ path: join(__dirname, '../../.env') });

export const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function clientConnect() {
  try {
    await client.connect();
  } catch (error) {
    console.log(error);
  }
}

export async function initDb() {
  // Create the tables if their not exists:
  await client.query(
    `CREATE TABLE IF NOT EXISTS locations(
          location_id SERIAL PRIMARY KEY,
          lat INTEGER NOT NULL,
          lon INTEGER NOT NULL,
          base_name TEXT NOT NULL,
          nearest_city TEXT NOT NULL
      );`
  );

  await client.query(
    `CREATE TABLE IF NOT EXISTS officers(
          officer_id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          army_identity_number INTEGER NOT NULL,
          email TEXT NOT NULL,
          phone_number TEXT NOT NULL
      );`
  );

  await client.query(
    `CREATE TABLE IF NOT EXISTS bombs(
          bomb_id SERIAL PRIMARY KEY,
          model TEXT NOT NULL,
          quantity INTEGER NOT NULL,
          size INTEGER NOT NULL,
          manufacturing_year DATE NOT NULL,
          location_id INTEGER,
          officer_id INTEGER,
          CONSTRAINT FK_locationID FOREIGN KEY(location_id)
          REFERENCES locations(location_id),
          CONSTRAINT FK_officerId FOREIGN KEY(officer_id)
          REFERENCES officers(officer_id)
      );`
  );

  await client.query(
    `CREATE TABLE IF NOT EXISTS locations_history(
        location_history_id SERIAL PRIMARY KEY,
        arrival_date DATE NOT NULL,
        departure_date DATE NOT NULL,
        location_id INTEGER,
        bomb_id INTEGER,
        CONSTRAINT FK_locationID FOREIGN KEY(location_id)
        REFERENCES locations(location_id),
        CONSTRAINT FK_bombId FOREIGN KEY(bomb_id)
        REFERENCES bombs(bomb_id)
        );`
  );
  console.log('create');
}

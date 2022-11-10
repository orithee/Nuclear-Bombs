import { Client } from 'pg';
import dotenv from 'dotenv';
import { join } from 'path';
dotenv.config({ path: join(__dirname, '../../.env') });

export const postgres = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

export async function postgresConnect() {
  try {
    await postgres.connect();
    console.log('Postgres connected successfully!');
  } catch (error) {
    console.log(error);
  }
}

export async function createTables() {
  // Create the tables if their not exists:
  try {
    // Users:
    await postgres.query(
      `CREATE TABLE IF NOT EXISTS users(
              user_id SERIAL PRIMARY KEY,
              user_name TEXT NOT NULL,
              );`
    );
  } catch (error) {
    console.log(error);
  } finally {
    console.log('Finish createTables');
  }
}

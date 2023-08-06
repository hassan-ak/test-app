import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import dotenv from 'dotenv';

dotenv.config();

const connectionString =
  process.env.POSTGRES_URL + '?sslmode=require' || '';

const sql = postgres(connectionString, { max: 1 });
const db = drizzle(sql);


migrate(db, { migrationsFolder: 'drizzle' })
  .then((msg) => {
    console.log('Migration successful ===> ', msg);
  })
  .catch((err) => {
    console.log('Migration failed ===> ', err);
  });

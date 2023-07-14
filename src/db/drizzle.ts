import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres'
import dotenv from 'dotenv'

dotenv.config();
const env = dotenv.config();

const connectionString = `postgres://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST}:5432/${process.env.POSTGRES_DATABASE}?sslmode=require`;
const sql = postgres(connectionString, { max: 1 });
export const db = drizzle(sql);
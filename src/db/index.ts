import "dotenv/config";
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres, { Sql } from 'postgres';
import * as schema from './schema';

let connection: Sql<any>;

if (process.env.NODE_ENV === 'production') {
  connection = postgres(process.env.DATABASE_URL!);
} else {
  const globalConnection = global as typeof globalThis & {
    connection: Sql<any>;
  };

  if (!globalConnection.connection) globalConnection.connection = postgres(process.env.DATABASE_URL!);

  connection = globalConnection.connection;
}

const db = drizzle(connection, { schema, logger: process.env.NODE_ENV !== 'production' });

export default db;
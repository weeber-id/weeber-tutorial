import { app } from './app';
import { Client } from 'pg';

const PORT = process.env.PORT || 8080;

export const client = new Client({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  port: Number(process.env.PGPORT) || 5433,
});

const start = async () => {
  await client.connect();
  console.log('Connected to DB');

  app.listen(PORT, () => {
    console.log(`Listening to port ${PORT}`);
  });
};

start();

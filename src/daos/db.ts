import { Pool } from 'pg';

export const db = new Pool({
    database: 'postgres',
    host: process.env.P0_APP_URL,
    port: 5432,
    user: process.env.P0_APP_ROLE,
    password: process.env.P0_APP_PASS
});
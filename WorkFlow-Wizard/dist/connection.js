import dotenv from 'dotenv';
dotenv.config();
// Import and require Pool (node-postgres)
import pg from 'pg';
const { Pool } = pg;
// We'll be creating a Connection Pool.
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    database: process.env.DB_NAME,
    port: 5432,
});
//export connection pool
export { pool };

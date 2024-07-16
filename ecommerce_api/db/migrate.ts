import 'dotenv/config';

import { Pool } from "pg";
import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from "drizzle-orm/node-postgres/migrator";

console.log(process.env.DATABASE_URL);

const pool = new Pool({
    connectionString: process.env.DATABASE_URL 
});

const db = drizzle(pool);

async function main() {
    try {
        console.log("PostgreSQL Migration started");
        await migrate(db, { migrationsFolder: "drizzle" });
        console.log("Migration ended");
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}
main()
export default db
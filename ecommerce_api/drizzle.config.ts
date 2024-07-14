import { defineConfig } from "drizzle-kit"
export default defineConfig({
    dialect: "postgresql",
    dbCredentials: {
        url: "postgres://postgres:postgres@localhost:5432/testDB"
    },
    schema: "./db/schema.ts",
   
})
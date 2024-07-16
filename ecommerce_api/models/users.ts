import { uuid, pgTable, text, varchar, unique } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable("users", {
    id: uuid("id").defaultRandom().primaryKey().unique(),
    username: text("username").unique(),
    email: varchar("email", { length: 100 }).notNull().unique(),
    password: varchar("password", { length: 100 }).notNull(),
    phone_number: varchar("phone_number", { length: 12 }).notNull()
});
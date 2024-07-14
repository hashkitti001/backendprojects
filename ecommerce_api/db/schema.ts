import { uuid, pgTable, text, varchar, doublePrecision, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const users = pgTable("users", {
    id: uuid("id").primaryKey(),
    username: text("username"),
    email: varchar("email", { length: 100 }),
    password: varchar("password", { length: 100 }),
    phone_number: varchar("phone_number", { length: 12 })
});

export const products = pgTable("products", {
    id: uuid("id").primaryKey(),
    name: text("name"),
    description: varchar("description", { length: 100 }),
    price: doublePrecision("price").default(0.00),
    stock: integer("stock")
});



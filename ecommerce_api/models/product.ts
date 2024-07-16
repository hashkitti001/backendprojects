import { uuid, pgTable, text, varchar, doublePrecision, integer } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';

export const products = pgTable("products", {
    id: uuid("id").primaryKey(),
    name: text("name").notNull().unique(),
    description: varchar("description", { length: 100 }).notNull(),
    price: doublePrecision("price").default(0.00).notNull(),
    stock: integer("stock").notNull()
});


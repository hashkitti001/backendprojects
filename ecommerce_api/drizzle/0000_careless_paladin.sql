CREATE TABLE IF NOT EXISTS "products" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" text,
	"description" varchar(100),
	"price" double precision DEFAULT 0,
	"stock" integer
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY NOT NULL,
	"username" text,
	"email" varchar(100),
	"password" varchar(100),
	"phone_number" varchar(12)
);

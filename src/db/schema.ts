import { sql } from "drizzle-orm";
import { integer, json, pgTable, serial, uuid, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
    id: uuid().primaryKey().notNull().unique().default(sql`gen_random_uuid()`),
    username: varchar({ length: 32 }).notNull().unique(),
    email: varchar({ length: 64 }).notNull().unique(),
    password: varchar({ length: 110 }).notNull(),
    type: varchar({ enum: ["admin", "user"] }).notNull().default("user"),
    created_at: integer().notNull().default(sql`extract(epoch from now())`),
    updated_at: integer().notNull().default(sql`extract(epoch from now())`),
});

export const reportsTable = pgTable("reports", {
    id: serial().primaryKey().notNull().unique(),
    interface: varchar({ length: 255 }).notNull(),
    ip_address: varchar({ length: 15 }).notNull(),
    mac_address: varchar({ length: 17 }).notNull(),
    type: varchar({ enum: ["port", "device"] }).notNull(),
    protocol: varchar({ enum: ["TCP", "UDP"] }).notNull(),
    result: json().notNull(),
    status: varchar({ enum: ["good", "bad"] }).notNull(),
    timestamp: integer().notNull().default(sql`extract(epoch from now())`),
});
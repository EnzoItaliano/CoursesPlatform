import { pgTable } from "drizzle-orm/pg-core";
import { text, uuid } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
})

export const courses = pgTable('courses', {
    id: uuid('id').defaultRandom().primaryKey(),
    title: text().notNull().unique(),
    description: text(),
})
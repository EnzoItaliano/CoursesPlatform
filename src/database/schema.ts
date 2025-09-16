import { pgTable, text, uuid, timestamp, uniqueIndex } from "drizzle-orm/pg-core";

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

export const enrollments = pgTable('enrollments', {
    // id: uuid('id').defaultRandom().primaryKey(),
    userId: uuid('userId').notNull().references(() => users.id),
    courseId: uuid('courseId').notNull().references(() => courses.id),
    createdAt: timestamp({ withTimezone: true }).defaultNow().notNull(),
}, table => [
    uniqueIndex().on(table.userId, table.courseId),
])
import { pgTable, text, uuid, timestamp, uniqueIndex, pgEnum } from "drizzle-orm/pg-core";

export const userRoles = pgEnum('user_roles', [
    'student',
    'manager'
])

export const users = pgTable('users', {
    id: uuid('id').defaultRandom().primaryKey(),
    name: text('name').notNull(),
    email: text('email').notNull().unique(),
    password: text().notNull(),
    role: userRoles().notNull().default('student'),
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
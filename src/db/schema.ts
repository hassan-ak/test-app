import { relations } from 'drizzle-orm';
import {
  serial,
  varchar,
  timestamp,
  date,
  pgTable,
  integer,
  boolean,
  decimal,
  text,
  time,
  unique,
} from 'drizzle-orm/pg-core';

export const roles = pgTable('roles', {
  roleId: serial('roleId').primaryKey(),
  roleName: varchar('roleName', { length: 50 }),
  createdOn: timestamp('createdOn').defaultNow(),
});

export const users = pgTable('users', {
  userId: serial('userId').primaryKey(),
  userName: varchar('userName', { length: 500 }),
  cnic: varchar('cnic', { length: 50 }),
  password: varchar('password', { length: 3000 }),
  emailVerificationToken: varchar('emailVerificationToken', { length: 3000 }),
  emailVerified: boolean('emailVerified'),
  isActive: boolean('isActive'),
  roleId: integer('roleId').references(() => roles.roleId),
  status: varchar('status', { length: 50 }),
  isBlocked: boolean('isBlocked'),
  blockReason: varchar('blockReason', { length: 1000 }),
  createdOn: timestamp('createdOn').defaultNow(),
  updatedOn: timestamp('updatedOn'),
  updatedBy: integer('updatedBy').references(() => roles.roleId),
});

export const cities = pgTable('cities', {
  cityId: serial('cityId').primaryKey(),
  cityName: varchar('cityName', { length: 200 }).notNull(),
  createdOn: timestamp('createdOn').defaultNow(),
});

export const courses = pgTable('courses', {
  courseId: serial('course_id').primaryKey(),
  courseName: varchar('course_name', { length: 200 }),
  inital: varchar('inital', { length: 200 }),
  longDescription: varchar('long_description', { length: 3000 }),
  shortDescription: varchar('short_description', { length: 1500 }),
  createdOn: date('created_on').defaultNow(),
});

export const batches = pgTable('batches', {
  batchId: serial('batchId').primaryKey(),
  batchName: varchar('batchName', { length: 50 }),
  isRegistrationActive: boolean('isRegistrationActive'),
  cityId: integer('cityId').references(() => cities.cityId),
  isBatchActive: boolean('isBatchActive'),
  isActive: boolean('isActive'),
  regStartDate: date('regStartDate'),
  regEndDate: date('regEndDate'),
  batchEndDate: date('batchEndDate'),
  isRestricted: boolean('isRestricted'),
  isEntryTestMandatory: boolean('isEntryTestMandatory'),
});

export const announcements = pgTable(
  'announcements',
  {
    announcementId: serial('announcementId').primaryKey(),
    title: varchar('title', { length: 200 }).notNull(),
    description: varchar('description', { length: 2000 }).notNull(),
    url: varchar('url', { length: 500 }).notNull(),
    createdOn: timestamp('createdOn').defaultNow(),
    isGeneralAnnouncement: boolean('isGeneralAnnouncement').default(false),
    isForAllBatches: boolean('forAllBatches').default(false),
    isForAllCourses: boolean('forAllCourses').default(false),
    batchId: integer('batchId').references(() => batches.batchId),
    courseId: integer('courseId').references(() => courses.courseId),
    createdBy: integer('createdBy')
      .references(() => users.userId)
      .notNull(),
    updatedBy: integer('updatedBy')
      .references(() => users.userId)
      .notNull(),
  },
  (t) => ({
    unq: unique('announcements_uniques').on(
      t.title,
      t.description,
      t.url,
      t.isGeneralAnnouncement,
      t.isForAllBatches,
      t.batchId,
      t.isForAllCourses,
      t.courseId
    ),
  })
);

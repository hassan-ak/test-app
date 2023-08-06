import { pgTable, serial, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';

export const jwt_users = pgTable('jwt_users', {
  user_id: serial('user_id').primaryKey(),
  name:varchar("name",{length:256}).notNull(),
  email:varchar("email",{length:256}).notNull().unique(),
  password:varchar("password",{length:256}).notNull(),
  role:varchar("role",{length:256}).default("user"),
  photo:varchar("photo",{length:256}).default("default.png"),
  verified:boolean("verified").default(false),
  created_at: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updatedAt').defaultNow(),
});


CREATE TABLE IF NOT EXISTS "announcements" (
	"announcementId" serial PRIMARY KEY NOT NULL,
	"title" varchar(200) NOT NULL,
	"description" varchar(2000) NOT NULL,
	"url" varchar(500) NOT NULL,
	"createdOn" timestamp DEFAULT now(),
	"isGeneralAnnouncement" boolean DEFAULT false,
	"forAllBatches" boolean DEFAULT false,
	"forAllCourses" boolean DEFAULT false,
	"batchId" integer,
	"courseId" integer,
	"createdBy" integer NOT NULL,
	"updatedBy" integer NOT NULL,
	CONSTRAINT "announcements_uniques" UNIQUE("title","description","url","isGeneralAnnouncement","forAllBatches","batchId","forAllCourses","courseId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "batches" (
	"batchId" serial PRIMARY KEY NOT NULL,
	"batchName" varchar(50),
	"isRegistrationActive" boolean,
	"cityId" integer,
	"isBatchActive" boolean,
	"isActive" boolean,
	"regStartDate" date,
	"regEndDate" date,
	"batchEndDate" date,
	"isRestricted" boolean,
	"isEntryTestMandatory" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "cities" (
	"cityId" serial PRIMARY KEY NOT NULL,
	"cityName" varchar(200) NOT NULL,
	"createdOn" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "courses" (
	"course_id" serial PRIMARY KEY NOT NULL,
	"course_name" varchar(200),
	"inital" varchar(200),
	"long_description" varchar(3000),
	"short_description" varchar(1500),
	"created_on" date DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"roleId" serial PRIMARY KEY NOT NULL,
	"roleName" varchar(50),
	"createdOn" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"userId" serial PRIMARY KEY NOT NULL,
	"userName" varchar(500),
	"cnic" varchar(50),
	"password" varchar(3000),
	"emailVerificationToken" varchar(3000),
	"emailVerified" boolean,
	"isActive" boolean,
	"roleId" integer,
	"status" varchar(50),
	"isBlocked" boolean,
	"blockReason" varchar(1000),
	"createdOn" timestamp DEFAULT now(),
	"updatedOn" timestamp,
	"updatedBy" integer
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "announcements" ADD CONSTRAINT "announcements_batchId_batches_batchId_fk" FOREIGN KEY ("batchId") REFERENCES "batches"("batchId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "announcements" ADD CONSTRAINT "announcements_courseId_courses_course_id_fk" FOREIGN KEY ("courseId") REFERENCES "courses"("course_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "announcements" ADD CONSTRAINT "announcements_createdBy_users_userId_fk" FOREIGN KEY ("createdBy") REFERENCES "users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "announcements" ADD CONSTRAINT "announcements_updatedBy_users_userId_fk" FOREIGN KEY ("updatedBy") REFERENCES "users"("userId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "batches" ADD CONSTRAINT "batches_cityId_cities_cityId_fk" FOREIGN KEY ("cityId") REFERENCES "cities"("cityId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_roleId_roles_roleId_fk" FOREIGN KEY ("roleId") REFERENCES "roles"("roleId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "users" ADD CONSTRAINT "users_updatedBy_roles_roleId_fk" FOREIGN KEY ("updatedBy") REFERENCES "roles"("roleId") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

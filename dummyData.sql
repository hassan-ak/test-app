-- Roles Table
INSERT INTO
    "roles" ("roleName")
VALUES
    ('admin'),
    ('owner'),
    ('student'),
    ('guest')


-- Users Table
INSERT INTO "users" ("userName", "cnic", "password", "emailVerificationToken", "emailVerified", "isActive", "roleId", "status", "isBlocked", "blockReason", "createdOn", "updatedOn", "updatedBy")
VALUES 
    ('John Doe', '1234567890', 'password123', 'verification_token_1', true, true, 1, 'Active', false, '', now(), now(), 1),
    ('Jane Smith', '9876543210', 'password456', 'verification_token_2', true, true, 2, 'Active', false, '', now(), now(), 2),
    ('Alice Johnson', '5555555555', 'password789', 'verification_token_3', true, true, 3, 'Active', false, '', now(), now(), 3),
    ('Bob Anderson', '1111111111', 'passwordabc', 'verification_token_4', true, true, 4, 'Active', false, '', now(), now(), 4),
    ('Emily Wilson', '9999999999', 'passworddef', 'verification_token_5', true, true, 1, 'Active', false, '', now(), now(), 1);


-- cities Table
INSERT INTO
    "cities" ("cityName")
VALUES
    ('lahore'),
    ('karachi')

-- courses Table
INSERT INTO "courses" ("course_name", "inital", "long_description", "short_description", "created_on")
VALUES 
    ('Metaverse', 'WMD', '---', '-', now()),
    ('Blockchain', 'BCC', '---', '-', now())

-- batches Table
INSERT INTO "batches" ("batchName", "isRegistrationActive", "cityId", "isBatchActive", "isActive", "regStartDate", "regEndDate", "batchEndDate", "isRestricted", "isEntryTestMandatory")
VALUES 
    ('Batch 2022-01', true, 1, true, true, '2022-01-01', '2022-01-15', '2022-12-31', false, true),
    ('Batch 2022-02', true, 2, true, true, '2022-02-01', '2022-02-15', '2022-12-31', false, true),
    ('Batch 2022-03', true, 1, true, true, '2022-03-01', '2022-03-15', '2022-12-31', false, true),
    ('Batch 2022-04', true, 1, true, true, '2022-04-01', '2022-04-15', '2022-12-31', false, true),
    ('Batch 2022-05', true, 2, true, true, '2022-05-01', '2022-05-15', '2022-12-31', false, true);

-- announcement Table
INSERT INTO "announcements" ("title", "description", "url", "isGeneralAnnouncement", "forAllBatches", "forAllCourses", "batchId", "courseId", "createdBy", "updatedBy")
VALUES
    ('Announcement 01', 'Announcement 01 description', 'https://e.com/announcement1', false, false, true, NULL, NULL, 1, 1),
    ('Announcement 02', 'Announcement 02 description', 'https://e.com/announcement2', false, false, false, 1, NULL, 2, 2),
    ('Announcement 03', 'Announcement 02 description', 'https://e.com/announcement3', false, true, false, NULL, 1, 3, 3);

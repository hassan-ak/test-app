## Dummy Data Mix.

```sql
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
    ('John Doe', '1234567890', 'password123', 'verification_token_1', true, true, 1, 'Active', false, '', now(), now(), now()),
    ('Jane Smith', '9876543210', 'password456', 'verification_token_2', true, true, 2, 'Active', false, '', now(), now(), now()),
    ('Alice Johnson', '5555555555', 'password789', 'verification_token_3', true, true, 3, 'Active', false, '', now(), now(), now()),
    ('Bob Anderson', '1111111111', 'passwordabc', 'verification_token_4', true, true, 4, 'Active', false, '', now(), now(), now()),
    ('Emily Wilson', '9999999999', 'passworddef', 'verification_token_5', true, true, 1, 'Active', false, '', now(), now(), now());

-- Courses Table
INSERT INTO "courses" ("courseName", "inital", "longDescription", "shortDescription")
VALUES
    ('Metaverse', 'WMD', '---', '-'),
    ('Blockchain', 'BCC', '---', '-'),
    ('Cloud Native', 'CNC', '---', '-')

-- Cities Table
INSERT INTO
    "cities" ("cityName")
VALUES
    ('lahore'),
    ('karachi'),
    ('faisalabad')

-- batches table
INSERT INTO "batches" (
    "batchName",
    "isRegistrationActive",
    "cityId",
    "isBatchActive",
    "isActive",
    "regStartDate",
    "regEndDate",
    "batchEndDate",
    "isRestricted",
    "isEntryTestMandatory"
)
VALUES
    ('1', true, 1, true, true, '2023-01-15', '2023-02-28', '2023-06-30', false, true),
    ('2', true, 2, false, true, '2023-03-01', '2023-04-15', '2023-08-31', true, false),
    ('3', false, 3, true, true, '2023-05-01', '2023-07-15', '2023-11-30', false, true)

-- Inserting dummy data into the "examKeys" table
INSERT INTO "examKeys" (
    "courseId",
    "courseName",
    "batchId",
    "batchName",
    "quizName",
    "examKey",
    "quizOrder",
    "createdBy",
    "updatedBy"
)
VALUES
    (1, 'WMD', 1, '1', 'linux', 'abcd1234', 1, 1, 1),
    (2, 'BCC', 1, '1', 'docker', 'efgh5678', 2, 1, 1),
    (3, 'CNC', 1, '1', 'AI for Everyone', 'ijkl9012', 3, 1, 1),
    (1, 'WMD', 2, '2', 'javascript', 'kil874', 4, 1, 1),
    (2, 'BCC', 2, '2', 'typescript', 'vhvh1vjhv', 5, 1, 1),
    (3, 'CNC', 2, '2', 'react', 'cfgbjhn78', 6, 1, 1),
    (1, 'WMD', 3, '3', 'nextjs.13', 'drgvybh7', 7, 1, 1),
    (2, 'BCC', 3, '3', 'sagemaker', 'xdcfgv78', 8, 1, 1),
    (1, 'WMD', 1, '1', 'sanity', '46klkl', 9, 1, 1),
    (2, 'BCC', 1, '1', 'aws', 'vjhjhl85', 10, 1, 1),
    (3, 'CNC', 1, '1', 'sql', 'ijasas12', 11, 1, 1),
    (1, 'WMD', 2, '2', 'vercel', 'xyzd1234', 12, 1, 1),
    (2, 'BCC', 2, '2', 'git', 'efgh8716', 13, 1, 1),
    (3, 'CNC', 2, '2', 'tailwind', 'ijasas12', 14, 1, 1)
```

## Dummy Data Text Books

1. WMD

```json
{
  "bookDetails": {
    "textBookTitle": "The Metaverse: And How It Will Revolutionize Everything",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690649849/metaverse_hm7x1w.png",
    "textBookUrl": "https://www.goodreads.com/book/show/59064518-the-metaverse",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [1]
  }
}
```

2. BCC

```json
{
  "bookDetails": {
    "textBookTitle": "Certified Blockchain Business Foundations Exam Guide",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690649537/cbbfe_xos29k.png",
    "textBookUrl": "https://drive.google.com/open?id=1hBhvp32-xjGFPSy6-dqmaJsXRMFt5XYS",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [2]
  }
}
```

```json
{
  "bookDetails": {
    "textBookTitle": "Certified Blockchain Developer Ethereum",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690649550/cbde_gotd5e.png",
    "textBookUrl": "https://drive.google.com/open?id=1RUmIEE1CWf6Xm-usAOTE-HiYQcSf1_yL",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [2]
  }
}
```

3. CNC

```json
{
  "bookDetails": {
    "textBookTitle": "Docker Deep Dive",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690648907/docker_vj8nj6.png",
    "textBookUrl": "https://drive.google.com/open?id=142rH04LjnqR2ffFEzbRSJicMpvpZ_29V",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [3]
  }
}
```

```json
{
  "bookDetails": {
    "textBookTitle": "Manning Kubernetes in Action",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690648934/Kubernetes_fzhrrd.png",
    "textBookUrl": "https://drive.google.com/open?id=1inJ45iQLProeOIHyt4k5Ep8DY5Cfxs00",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [3]
  }
}
```

4. WMD + BCC

```json
{
  "bookDetails": {
    "textBookTitle": "Mastering Bitcoin",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690649572/bitcoin_pyyup4.png",
    "textBookUrl": "https://drive.google.com/open?id=1awf_LQNfTE9gFcCD8jENOablk8F0zUMj",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [1, 2]
  }
}
```

```json
{
  "bookDetails": {
    "textBookTitle": "Solidity Programming Essentials",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690649558/solidity_xfssnc.png",
    "textBookUrl": "https://drive.google.com/open?id=1R-JbQ6HX2e9zMRLDmlpIVFPmxJGx9h4o",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [1, 2]
  }
}
```

5. WMD + CNC

```json
{
  "bookDetails": {
    "textBookTitle": "A Smarter Way to Learn JavaScript by Mark Myers",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690649033/js_jfg26j.png",
    "textBookUrl": "https://drive.google.com/open?id=147UyzyrmWPSphddp5TOk6PWwVudGF4Y-",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [1, 3]
  }
}
```

```json
{
  "bookDetails": {
    "textBookTitle": "HTML and CSS: Design and Build Websites by Jon Duckett",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690649017/html_zojjvf.png",
    "textBookUrl": "https://drive.google.com/open?id=1UEOzps_BDX-GYu7LQkHG95HmogVBcyIF",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [1, 3]
  }
}
```

6. BCC + CNC

```json
{
  "bookDetails": {
    "textBookTitle": "Linux Easy Linux for Beginner",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690648738/linux_pmhiap.png",
    "textBookUrl": "https://drive.google.com/open?id=16_MtHJVZyUQSeALBflVNOWUX0wLh5ffv",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [2, 3]
  }
}
```

7. WMD + BCC + CNC

```json
{
  "bookDetails": {
    "textBookTitle": "Learn Version Control with Git",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690649005/git_szni25.png",
    "textBookUrl": "https://drive.google.com/open?id=1J6xyDMV70X_66G0RwWH2BFBHB6Lm7LQ4",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": false
  },
  "bookCourseRelation": {
    "courseIds": [1, 2, 3]
  }
}
```

7. All

```json
{
  "bookDetails": {
    "textBookTitle": "Clean Code",
    "textBookImageUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1690651534/code_njuhsp.png",
    "textBookUrl": "https://www.amazon.com/Clean-Code-Handbook-Software-Craftsmanship/dp/0132350882",
    "createdBy": 1,
    "updatedBy": 1,
    "isForAllCourses": true
  },
  "bookCourseRelation": {}
}
```

## Dummy Data Exam Browsers

1. Windows

```json
{
  "operatingSystem": "Windows",
  "examBrowserTitle": "Safe Exam Browser",
  "examBrowserLogoUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1691531523/examBrowser_d0vjn1.png",
  "examBrowserDownloadUrl": "https://drive.google.com/open?id=19tT6nYujZ_FGlqLae72cqhM1XF77YZNf",
  "examBrowserVersion": "2.4",
  "examBrowserConfigUrl": "https://portal.piaic.org/static/media/Seb_K2.a146cd05.seb",
  "createdBy": 1
}
```

2. Mac

```json
{
  "operatingSystem": "Mac",
  "examBrowserTitle": "Safe Exam Browser",
  "examBrowserLogoUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1691531523/examBrowser_d0vjn1.png",
  "examBrowserDownloadUrl": "https://drive.google.com/file/d/1si9vm47d1E3-1BBUasd3GW_KJaDNpgvh",
  "examBrowserVersion": "2.1.4",
  "examBrowserConfigUrl": "https://portal.piaic.org/static/media/Seb_K2_updated_mac.c78d3bf8.seb",
  "createdBy": 1
}
```

2. Ubuntu

```json
{
  "operatingSystem": "ubuntu",
  "examBrowserTitle": "Safe Exam Browser",
  "examBrowserLogoUrl": "https://res.cloudinary.com/dgeqvleeq/image/upload/v1691531523/examBrowser_d0vjn1.png",
  "examBrowserDownloadUrl": "https://drive.google.com/file/d/1si9vm47d1E3-1BBUasd3GW_KJaDNpgvh",
  "examBrowserVersion": "4.1.4",
  "examBrowserConfigUrl": "https://portal.piaic.org/static/media/Seb_K2_updated_mac.c78d3bf8.seb",
  "createdBy": 1
}
```

## Dummy Data Exam Keys

```sql
-- Inserting dummy data into the "examKeys" table
INSERT INTO "examKeys" (
    "courseId",
    "courseName",
    "batchId",
    "batchName",
    "quizName",
    "examKey",
    "quizOrder",
    "createdBy",
    "updatedBy"
)
VALUES
    (1, 'WMD', 1, '1', 'linux', 'abcd1234', 1, 1, 1),
    (2, 'BCC', 1, '1', 'docker', 'efgh5678', 2, 1, 1),
    (3, 'CNC', 1, '1', 'AI for Everyone', 'ijkl9012', 3, 1, 1),
    (1, 'WMD', 2, '2', 'javascript', 'abcd1234', 1, 1, 1),
    (2, 'BCC', 2, '2', 'typescript', 'efgh5678', 2, 1, 1),
    (3, 'CNC', 2, '2', 'react', 'ijkl9012', 3, 1, 1),
    (1, 'WMD', 3, '3', 'nextjs.13', 'abcd1234', 1, 1, 1),
    (2, 'BCC', 3, '3', 'sagemaker', 'efgh5678', 2, 1, 1),
    (1, 'WMD', 1, '1', 'sanity', 'xyzd1234', 1, 1, 1),
    (2, 'BCC', 1, '1', 'aws', 'efgh8716', 2, 1, 1),
    (3, 'CNC', 1, '1', 'sql', 'ijasas12', 3, 1, 1),
    (1, 'WMD', 2, '2', 'vercel', 'xyzd1234', 1, 1, 1),
    (2, 'BCC', 2, '2', 'git', 'efgh8716', 2, 1, 1),
    (3, 'CNC', 2, '2', 'tailwind', 'ijasas12', 3, 1, 1)
```

## Dummy Data announcements

```sql
-- Inserting more dummy data into the "announcements" table
INSERT INTO "announcements" ("title", "description", "url", "createdOn" ,"createdBy")
VALUES
('Holiday Closure', 'Please note that the campus will be closed for the upcoming public holiday. Enjoy your break!', 'https://example.com/holiday-closure',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Career Development Seminar', 'Join us for a seminar on career development strategies. Enhance your skills and boost your career prospects.', 'https://example.com/career-seminar',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Research Symposium Call for Papers', 'Submit your research papers for the upcoming symposium. Share your findings with the academic community.', 'https://example.com/symposium-cfp',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Volunteer Opportunity: Community Cleanup', 'Get involved in a community cleanup event this weekend. Make a positive impact in our neighborhood.', 'https://example.com/community-cleanup',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Sports Day Registration', 'Sign up for the annual sports day event. Compete in various sports and enjoy a day of friendly competition.', 'https://example.com/sports-day-registration',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Student Art Exhibition', 'Visit our student art exhibition showcasing a diverse range of creative talents. Support our budding artists!', 'https://example.com/art-exhibition',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Guest Speaker Series: Climate Change', 'Attend an informative talk by a renowned expert on the topic of climate change. Expand your knowledge.', 'https://example.com/climate-change-talk',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Scholarship Applications Now Open', 'Apply for our merit-based scholarships for the upcoming academic year. Don''t miss out on this opportunity.', 'https://example.com/scholarship-applications',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Campus Safety Awareness Week', 'Participate in our safety awareness week. Learn about campus safety measures and emergency protocols.', 'https://example.com/safety-awareness-week',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Language Exchange Program', 'Interested in learning a new language? Join our language exchange program and connect with language enthusiasts.', 'https://example.com/language-exchange',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Coding Workshop: Web Development', 'Join our coding workshop focused on web development. Learn HTML, CSS, and JavaScript fundamentals.', 'https://example.com/coding-workshop',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Student Leadership Conference', 'Register for the upcoming student leadership conference. Develop leadership skills and network with peers.', 'https://example.com/leadership-conference',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Health and Wellness Fair', 'Explore a variety of health and wellness resources at our upcoming fair. Take care of your physical and mental health.', 'https://example.com/health-fair',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Internship Opportunities Panel', 'Attend a panel discussion featuring industry professionals. Learn about exciting internship opportunities.', 'https://example.com/internship-panel',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Diversity and Inclusion Workshop', 'Participate in a workshop focused on promoting diversity and inclusion on campus. Contribute to a welcoming environment.', 'https://example.com/diversity-workshop',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Student Research Grants', 'Apply for research grants to fund your academic projects. Support your research endeavors and make an impact.', 'https://example.com/research-grants',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Art Club Meeting', 'Join us for the next art club meeting. Share your artistic creations and collaborate with fellow artists.', 'https://example.com/art-club-meeting',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Study Abroad Information Session', 'Explore study abroad opportunities and learn about the benefits of international education. Expand your horizons!', 'https://example.com/study-abroad-info',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Career Fair: Networking Event', 'Connect with recruiters from top companies at our career fair. Explore job and internship opportunities.', 'https://example.com/career-fair',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Wellness Workshop: Stress Management', 'Learn effective strategies for managing stress and maintaining well-being. Prioritize self-care for success.', 'https://example.com/stress-management-workshop',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Environmental Sustainability Talk', 'Engage in a talk about environmental sustainability and discover ways to contribute to a greener future.', 'https://example.com/sustainability-talk',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Student Film Screening', 'Join us for a screening of short films created by students. Celebrate their creative achievements!', 'https://example.com/film-screening',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Parent-Teacher Conference', 'Parents are invited to discuss their child''s progress with teachers during the upcoming conference.', 'https://example.com/parent-teacher-conference',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Startup Pitch Competition', 'Entrepreneurs-in-training can showcase their startup ideas in a pitch competition. Win prizes and gain exposure!', 'https://example.com/startup-pitch',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Tech Symposium: Emerging Technologies', 'Explore the latest trends in technology at our symposium. Learn about AI, blockchain, and more.', 'https://example.com/tech-symposium',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Student Volunteer Awards', 'Nominate outstanding student volunteers for recognition at the upcoming awards ceremony.', 'https://example.com/volunteer-awards',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Writing Workshop: Creative Writing', 'Hone your creative writing skills in this workshop. Express yourself through storytelling and prose.', 'https://example.com/creative-writing-workshop',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Music Club Open Mic Night', 'Musicians and singers can showcase their talents at the open mic night hosted by the music club.', 'https://example.com/open-mic-night',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('STEM Conference: Innovations', 'Participate in a STEM conference showcasing innovative research and projects across various fields.', 'https://example.com/stem-conference',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Language Learning Resources', 'Explore our collection of language learning resources to enhance your linguistic abilities.', 'https://example.com/language-learning',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Music Festival: Save the Date', 'Mark your calendar for the upcoming music festival featuring live performances from local artists.', 'https://example.com/music-festival',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Coding Competition Registration', 'Register now for the coding competition and put your programming skills to the test. Win exciting prizes!', 'https://example.com/coding-competition',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Job Search Workshop', 'Join us for a workshop focused on job search strategies, resume writing, and interview preparation.', 'https://example.com/job-search-workshop',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Health Sciences Seminar Series', 'Explore the latest advancements in health sciences through our informative seminar series.', 'https://example.com/health-sciences-seminar',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Film Club Marathon Night', 'Enjoy a movie marathon with the film club. Watch classic and contemporary films throughout the night.', 'https://example.com/film-marathon',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Social Media Marketing Workshop', 'Learn effective social media marketing techniques to promote your personal brand or business.', 'https://example.com/social-media-workshop',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Photography Exhibition: Captured Moments', 'Visit our photography exhibition featuring captivating images captured by our talented photographers.', 'https://example.com/photo-exhibition',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('International Food Fair', 'Experience a culinary journey with dishes from around the world at our international food fair.', 'https://example.com/food-fair',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Science Fiction Book Club Meeting', 'Discuss and analyze the latest science fiction novel with fellow enthusiasts at our book club meeting.', 'https://example.com/sci-fi-book-club',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Entrepreneurship Panel Discussion', 'Join entrepreneurs and business leaders for a panel discussion on the challenges and rewards of entrepreneurship.', 'https://example.com/entrepreneurship-panel',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Language Exchange Social Event', 'Practice your language skills and make new friends at our language exchange social event.', 'https://example.com/language-exchange-event',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Art Workshop: Mixed Media', 'Unleash your creativity in a mixed media art workshop. Experiment with various techniques and materials.', 'https://example.com/mixed-media-workshop',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Fashion Show Auditions', 'Calling all aspiring models and designers! Audition for our upcoming campus fashion show.', 'https://example.com/fashion-show-auditions',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Public Speaking Workshop', 'Enhance your public speaking skills and build confidence through our interactive workshop sessions.', 'https://example.com/public-speaking-workshop',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Community Service Day', 'Join fellow students in giving back to the community through various service projects and activities.', 'https://example.com/community-service-day',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Math Olympiad Practice Sessions', 'Prepare for the upcoming math Olympiad by participating in our practice sessions and solving challenging problems.', 'https://example.com/math-olympiad-practice',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Dance Club Showcase', 'Experience an energetic dance performance showcasing different dance styles and choreographies.', 'https://example.com/dance-club-showcase',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Mock Trial Competition', 'Participate in our mock trial competition and experience the dynamics of a courtroom setting.', 'https://example.com/mock-trial-competition',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Literary Reading Evening', 'Listen to literary enthusiasts read and discuss their favorite poems, stories, and literary works.', 'https://example.com/literary-reading-evening',(NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days')),1),
('Random Event 1', 'This is a randomly generated announcement.', 'https://example.com/random-event1', NOW() - INTERVAL '30 days' + (RANDOM() * INTERVAL '30 days'),1),
('Random Event 2', 'This is another randomly generated announcement.', 'https://example.com/random-event2', NOW() - INTERVAL '60 days' + (RANDOM() * INTERVAL '60 days'),1),
('Random Event 3', 'Yet another randomly generated announcement.', 'https://example.com/random-event3', NOW() - INTERVAL '90 days' + (RANDOM() * INTERVAL '90 days'),1),
('Random Event 4', 'One more randomly generated announcement.', 'https://example.com/random-event4', NOW() - INTERVAL '120 days' + (RANDOM() * INTERVAL '120 days'),1),
('Random Event 5', 'The final randomly generated announcement.', 'https://example.com/random-event5', NOW() - INTERVAL '150 days' + (RANDOM() * INTERVAL '150 days'),1);
```

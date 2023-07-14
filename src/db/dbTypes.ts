import { InferModel } from 'drizzle-orm';
import { announcements } from './schema';

export type AnnouncementsType = InferModel<typeof announcements>; // return type when queried
export type NewAnnouncementType = InferModel<typeof announcements, 'insert'>; // insert type
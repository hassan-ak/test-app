import { InferModel } from 'drizzle-orm';
import { jwt_users } from './schema/script';


export type JwtUser = InferModel<typeof jwt_users>; // return type when queried
export type NewJwtUser = InferModel<typeof jwt_users, 'insert'>; // insert type

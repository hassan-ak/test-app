import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { db } from './drizzle';

migrate(db, { migrationsFolder: "drizzle" }).then(msg => {
    console.log('migration executed')
}).catch(err => {
    console.log('Error Occured', err);
});
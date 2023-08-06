# JWT Authentication in Next.js 13 API Route Handlers

### Create Next app

1. Create next app
   ```npx
   npx create-next-app@latest
   ```
2. Run the app
   ```cmd
   npm run dev
   ```
3. Deploy the app to vercel
   ```cmd
   vercel
   ```

### Connect to vercel postgres

3. Create a new postgres storage and connect deployed project with it
4. Pull your latest environment variables
   ```cmd
   vercel env pull .env.development.local
   ```
5. Install postgres and drizzle in the app
   ```cmd
   npm i drizzle-orm
   npm i postgres
   npm i @vercel/postgres
   npm i -D drizzle-kit
   ```
6. Create `/src/lib/db/drizzle.ts` to define db connection
   ```ts
   import { sql } from '@vercel/postgres';
   import { drizzle } from 'drizzle-orm/vercel-postgres';
   export const db = drizzle(sql);
   ```

### Create and migrate schema

7. Create `/src/lib/db/schema/script.ts` to define tables schema
   ```ts
   import {
     pgTable,
     serial,
     varchar,
     boolean,
     timestamp,
   } from 'drizzle-orm/pg-core';
   export const jwt_users = pgTable('jwt_users', {
     user_id: serial('user_id').primaryKey(),
     name: varchar('name', { length: 256 }).notNull(),
     email: varchar('email', { length: 256 }).notNull().unique(),
     password: varchar('password', { length: 256 }).notNull(),
     role: varchar('role', { length: 256 }).default('user'),
     photo: varchar('photo', { length: 256 }).default('default.png'),
     verified: boolean('verified').default(false),
     created_at: timestamp('created_at').defaultNow(),
     updatedAt: timestamp('updatedAt').defaultNow(),
   });
   ```
8. Create `/src/lib/db/dbTypes.ts` to define db types
   ```ts
   import { InferModel } from 'drizzle-orm';
   import { jwt_users } from './schema/script';
   export type JwtUser = InferModel<typeof jwt_users>; // return type when queried
   export type NewJwtUser = InferModel<typeof jwt_users, 'insert'>; // insert type
   ```
9. Create drizzle configration file `drizzle.config.ts`
   ```ts
   import type { Config } from 'drizzle-kit';
   export default {
     schema: './src/lib/db/schema/script.ts',
     out: './drizzle',
   } satisfies Config;
   ```
10. Update `package.json` and add followoing to `scripts`
    ```json
    "generate": "drizzle-kit generate:pg",
    "drop": "drizzle-kit drop --out=drizzle"
    ```
11. Update `"target": "ES2022",` in `tsconfig.json`
12. Run following to create queries from schema
    ```cmd
    npm run generate
    ```
13. Install following dependancies to handle migration
    ```cmd
    npm i dotenv
    npm i esbuild-register
    ```
14. Create `.env` file
    ```env
    POSTGRES_URL="YOUR_POSTGRES_URL"
    ```
15. create `/src/lib/db/migrate.ts` to handle migration
    ```ts
    import { drizzle } from 'drizzle-orm/postgres-js';
    import { migrate } from 'drizzle-orm/postgres-js/migrator';
    import postgres from 'postgres';
    import dotenv from 'dotenv';
    dotenv.config();
    const connectionString =
      process.env.POSTGRES_URL + '?sslmode=require' || '';
    const sql = postgres(connectionString, { max: 1 });
    const db = drizzle(sql);
    migrate(db, { migrationsFolder: 'drizzle' })
      .then((msg) => {
        console.log('Migration successful ===> ', msg);
      })
      .catch((err) => {
        console.log('Migration failed ===> ', err);
      });
    ```
16. Update `package.json` and add followoing to `scripts`
    ```json
    "migrate": "node -r esbuild-register src/lib/db/migrate.ts"
    ```
17. Run the follwoing to execute migrations
    ```
    npm run migrate
    ```

### Run drizzle studio

18. Install following to use drizzle studio
    ```
    npm i pg
    ```
19. Update drizzle configration file `drizzle.config.ts` to follwoing
    ```ts
    import type { Config } from 'drizzle-kit';
    import * as dotenv from 'dotenv';
    dotenv.config();
    export default {
      schema: './src/lib/db/schema/script.ts',
      out: './drizzle',
      driver: 'pg',
      dbCredentials: {
        connectionString: process.env.POSTGRES_URL + '?sslmode=require' || '',
      },
    } satisfies Config;
    ```
20. Update `package.json` and add followoing to `scripts`
    ```json
    "drizzle": "drizzle-kit studio --port 5555"
    ```
21. Run the follwoing to open drizzle studio, this will open studio at
    ```
    http://127.0.0.1:5555/
    ```

### Create the Validation Schemas

22. Install `zod` for validation
    ```cmd
    npm i zod
    ```
23. Create `/src/lib/validations/user.schema.ts` to define validation schema
    ```ts
    import { z } from 'zod';
    export const RegisterUserSchema = z
      .object({
        name: z
          .string({
            required_error: 'Name is required',
          })
          .min(1, 'Full name is required'),
        email: z
          .string({
            required_error: 'Email is required',
          })
          .min(1, 'Email is required')
          .email('Email is invalid'),
        photo: z.string().optional(),
        password: z
          .string({
            required_error: 'Password is required',
          })
          .min(1, 'Password is required')
          .min(8, 'Password must be more than 8 characters')
          .max(32, 'Password must be less than 32 characters'),
        passwordConfirm: z
          .string({
            required_error: 'Confirm your password',
          })
          .min(1, 'Confirm your password'),
      })
      .refine((data) => data.password === data.passwordConfirm, {
        path: ['passwordConfirm'],
        message: 'Passwords do not match',
      });
    export const LoginUserSchema = z.object({
      email: z
        .string({
          required_error: 'Email is required',
        })
        .min(1, 'Email is required')
        .email('Email is invalid'),
      password: z
        .string({
          required_error: 'Password is required',
        })
        .min(1, 'Password is required')
        .min(8, 'Password must be at least 8 characters')
        .max(32, 'Password must be less than 32 characters'),
    });
    export type LoginUserInput = z.infer<typeof LoginUserSchema>;
    export type RegisterUserInput = z.infer<typeof RegisterUserSchema>;
    ```

### Create Utility Functions

23. Create `/src/lib/helper.ts` to define function to Get an environment variable
    ```ts
    type EnvVariableKey = 'JWT_SECRET_KEY' | 'JWT_EXPIRES_IN';
    export function getEnvVariable(key: EnvVariableKey): string {
      const value = process.env[key];
      if (!value || value.length === 0) {
        console.error(`The environment variable ${key} is not set.`);
        throw new Error(`The environment variable ${key} is not set.`);
      }
      return value;
    }
    ```
24. Update `/src/lib/helper.ts` to define function to return a Next.js API Response
    ```ts
    import { NextResponse } from 'next/server';
    import { ZodError } from 'zod';
    export function getErrorResponse(
      status: number = 500,
      message: string,
      errors: ZodError | null = null
    ) {
      return new NextResponse(
        JSON.stringify({
          status: status < 500 ? 'fail' : 'error',
          message,
          errors: errors ? errors.flatten() : null,
        }),
        {
          status,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }
    ```

### Create Functions to Sign and Verify the JWTs

25. Update `.env` to include JWT secret key and expiration time
    ```.env
    JWT_SECRET_KEY=my_ultra_secure_jwt_secret_key
    JWT_EXPIRES_IN=60
    ```
26. Install `jose`, it gives us the function to sign and verify jwt
    ```cmd
    npm i jose
    ```
27. Create `src/lib/token.ts` to define a function that sign the jwt
    ```ts
    import { getEnvVariable } from './helpers';
    import { SignJWT, jwtVerify } from 'jose';
    export const signJWT = async (
      payload: { sub: string },
      options: { exp: string }
    ) => {
      try {
        const secret = new TextEncoder().encode(
          getEnvVariable('JWT_SECRET_KEY')
        );
        const alg = 'HS256';
        return new SignJWT(payload)
          .setProtectedHeader({ alg })
          .setExpirationTime(options.exp)
          .setIssuedAt()
          .setSubject(payload.sub)
          .sign(secret);
      } catch (error) {
        throw error;
      }
    };
    ```
28. Update `src/lib/token.ts` to define a function that verify the jwt
    ```ts
    export const verifyJWT = async <T,>(token: string): Promise<T> => {
      try {
        return (
          await jwtVerify(
            token,
            new TextEncoder().encode(process.env.JWT_SECRET_KEY)
          )
        ).payload as T;
      } catch (error) {
        console.log(error);
        throw new Error('Your token has expired.');
      }
    };
    ```

### Create API Route Handlers to Handle the JWT Authentication

29. Install `bcryptjs` and its `types` for hashing user password
    ```cmd
    npm i bcryptjs
    npm i -D @types/bcryptjs
    ```
30. Create `src/app/api/auth/register/route.ts` to define an api endpoint for account registration
    ```ts
    import { db } from '@/lib/db/drizzle';
    import { jwt_users } from '@/lib/db/schema/script';
    import { getErrorResponse } from '@/lib/helpers';
    import {
      RegisterUserInput,
      RegisterUserSchema,
    } from '@/lib/validations/user.schema';
    import { hash } from 'bcryptjs';
    import { NextRequest, NextResponse } from 'next/server';
    import { ZodError } from 'zod';
    export async function POST(req: NextRequest) {
      try {
        const body = (await req.json()) as RegisterUserInput;
        const data = RegisterUserSchema.parse(body);
        const hashedPassword = await hash(data.password, 12);
        const user = await db
          .insert(jwt_users)
          .values({
            name: data.name,
            email: data.email,
            password: hashedPassword,
            photo: data.photo,
          })
          .returning();
        return new NextResponse(
          JSON.stringify({
            status: 'success',
            data: { user: { ...user[0], password: undefined } },
          }),
          {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      } catch (error: any) {
        if (error instanceof ZodError) {
          return getErrorResponse(400, 'failed validations', error);
        }
        if (error.code === '23505') {
          return getErrorResponse(409, 'user with that email already exists');
        }
        return getErrorResponse(500, error.message);
      }
    }
    ```
31. Create `src/app/api/auth/login/route.ts` to define an api endpoint to handle login
    ```ts
    import { db } from '@/lib/db/drizzle';
    import { jwt_users } from '@/lib/db/schema/script';
    import { getEnvVariable, getErrorResponse } from '@/lib/helpers';
    import { signJWT } from '@/lib/token';
    import {
      LoginUserInput,
      LoginUserSchema,
    } from '@/lib/validations/user.schema';
    import { compare } from 'bcryptjs';
    import { eq } from 'drizzle-orm';
    import { NextRequest, NextResponse } from 'next/server';
    import { ZodError } from 'zod';
    export async function POST(req: NextRequest) {
      try {
        const body = (await req.json()) as LoginUserInput;
        const data = LoginUserSchema.parse(body);
        const user = await db
          .select()
          .from(jwt_users)
          .where(eq(jwt_users.email, data.email));
        if (!user[0] || !(await compare(data.password, user[0].password))) {
          return getErrorResponse(401, 'Invalid email or password');
        }
        const JWT_EXPIRES_IN = getEnvVariable('JWT_EXPIRES_IN');
        const token = await signJWT(
          { sub: `${user[0].user_id}` },
          { exp: `${JWT_EXPIRES_IN}m` }
        );
        const tokenMaxAge = parseInt(JWT_EXPIRES_IN) * 60;
        const cookieOptions = {
          name: 'token',
          value: token,
          httpOnly: true,
          path: '/',
          secure: process.env.NODE_ENV !== 'development',
          maxAge: tokenMaxAge,
        };
        const response = new NextResponse(
          JSON.stringify({
            status: 'success',
            token,
          }),
          {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }
        );
        await Promise.all([
          response.cookies.set(cookieOptions),
          response.cookies.set({
            name: 'logged-in',
            value: 'true',
            maxAge: tokenMaxAge,
          }),
        ]);
        return response;
      } catch (error: any) {
        if (error instanceof ZodError) {
          return getErrorResponse(400, 'failed validations', error);
        }
        return getErrorResponse(500, error.message);
      }
    }
    ```
32. Create `src/app/api/auth/logout/route.ts` to define an api endpoint to handle logout
    ```ts
    import { NextRequest, NextResponse } from 'next/server';
    export async function GET(req: NextRequest) {
      const response = new NextResponse(JSON.stringify({ status: 'success' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
      await Promise.all([
        response.cookies.set({
          name: 'token',
          value: '',
          maxAge: -1,
        }),
        response.cookies.set({
          name: 'logged-in',
          value: '',
          maxAge: -1,
        }),
      ]);
      return response;
    }
    ```
33. Create `src/app/api/users/me/route.ts` to define an api endpoint to get user details
    ```ts
    import { db } from '@/lib/db/drizzle';
    import { jwt_users } from '@/lib/db/schema/script';
    import { getErrorResponse } from '@/lib/helpers';
    import { eq } from 'drizzle-orm';
    import { NextRequest, NextResponse } from 'next/server';
    export async function GET(req: NextRequest) {
      const userId = req.headers.get('X-USER-ID');
      if (!userId) {
        return getErrorResponse(
          401,
          'You are not logged in, please provide token to gain access'
        );
      }
      const user = await db
        .select()
        .from(jwt_users)
        .where(eq(jwt_users.user_id, Number(userId)));
      return NextResponse.json({
        status: 'success',
        data: { user: { ...user[0], password: undefined } },
      });
    }
    ```

### Create a Next.js Middleware to Protect Routes

34. Create `src/middleware.ts` to define middleware for protecting routes
    ```ts
    import { NextRequest, NextResponse } from 'next/server';
    import { verifyJWT } from './lib/token';
    import { getErrorResponse } from './lib/helpers';
    interface AuthenticatedRequest extends NextRequest {
      user: {
        id: string;
      };
    }
    let redirectToLogin = false;
    export async function middleware(req: NextRequest) {
      let token: string | undefined;
      if (req.cookies.has('token')) {
        token = req.cookies.get('token')?.value;
      } else if (req.headers.get('Authorization')?.startsWith('Bearer ')) {
        token = req.headers.get('Authorization')?.substring(7);
      }
      if (
        req.nextUrl.pathname.startsWith('/login') &&
        (!token || redirectToLogin)
      )
        return;
      if (
        !token &&
        (req.nextUrl.pathname.startsWith('/api/users') ||
          req.nextUrl.pathname.startsWith('/api/auth/logout'))
      ) {
        return getErrorResponse(
          401,
          'You are not logged in. Please provide a token to gain access.'
        );
      }
      const response = NextResponse.next();
      try {
        if (token) {
          const { sub } = await verifyJWT<{ sub: string }>(token);
          response.headers.set('X-USER-ID', sub);
          (req as AuthenticatedRequest).user = { id: sub };
        }
      } catch (error) {
        redirectToLogin = true;
        if (req.nextUrl.pathname.startsWith('/api')) {
          return getErrorResponse(
            401,
            "Token is invalid or user doesn't exists"
          );
        }
        return NextResponse.redirect(
          new URL(
            `/login?${new URLSearchParams({ error: 'badauth' })}`,
            req.url
          )
        );
      }
      const authUser = (req as AuthenticatedRequest).user;
      if (!authUser) {
        return NextResponse.redirect(
          new URL(
            `/login?${new URLSearchParams({
              error: 'badauth',
              forceLogin: 'true',
            })}`,
            req.url
          )
        );
      }
      if (req.url.includes('/login') && authUser) {
        return NextResponse.redirect(new URL('/profile', req.url));
      }
      return response;
    }
    export const config = {
      matcher: ['/profile', '/login', '/api/users/:path*', '/api/auth/logout'],
    };
    ```

### Test the JWT Authentication

35. Send a post request to `/api/auth/register` with the following body to register a new user

    ```json
    {
      "email": "admin@admin.com",
      "name": "Admin",
      "password": "password123",
      "passwordConfirm": "password123"
    }
    ```

36. Send a post request to `/api/auth/login` with the following body to login

    ```json
    {
      "email": "admin@admin.com",
      "password": "password123"
    }
    ```

37. Send a get request to `/api/users/me` to get details of the logged-in user, this only works when you are already logged-in

38. Send a get request to `/api/auth/logout` logout, this only works when you are already logged-in

### User Registration and Login

39. Create `src/app/page.tsx` to define home page

```cmd
npm i @hookform/resolvers
npm i react-hook-form
npm install react-hot-toast
```
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

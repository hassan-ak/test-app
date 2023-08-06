import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
 
// middleware function to be executed
// will be executed for all mentioned routes
// in this example we are are just rerouting 
export function middleware(request: NextRequest) {
    console.log("consoled from middleware")
  return NextResponse.redirect(new URL('/about2', request.url))
}
 
// Define routes for which we need to execute the middleware function
export const config = {
  matcher: '/about1',
}
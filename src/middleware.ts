import { cookieMiddleware } from 'middleware/cookieMiddleware'
import { routeMiddleware } from 'middleware/routeMiddleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register']

const adminRoutes = ['/equipamentos']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (publicRoutes.includes(pathname)) {
    return cookieMiddleware(request)
  }

  if (adminRoutes.includes(pathname)) {
    return routeMiddleware(request)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/equipamentos', '/login']
}

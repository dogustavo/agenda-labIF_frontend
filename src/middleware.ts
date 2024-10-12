import { cookieMiddleware } from 'middleware/cookieMiddleware'
import { routeMiddleware } from 'middleware/routeMiddleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register']

const adminRoutes = ['/equipamentos']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isAdminRoute = adminRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route)
  )

  if (publicRoutes.includes(pathname)) {
    return cookieMiddleware(request)
  }

  if (isAdminRoute) {
    return routeMiddleware(request)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/equipamentos/:path*', '/login']
}

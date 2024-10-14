import { cookieMiddleware } from 'middleware/cookieMiddleware'
import { routeMiddleware } from 'middleware/routeMiddleware'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const publicRoutes = ['/login', '/register']

const adminRoutes = ['/equipamentos', '/usuarios']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  const userCookie = request.cookies.get('user-role')?.value
  const parsedCookie = userCookie ? JSON.parse(userCookie) : ''

  if (parsedCookie && parsedCookie.isReseted) {
    return NextResponse.redirect(new URL('/reset-senha', request.url))
  }

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
  matcher: ['/equipamentos/:path*', '/login', '/usuarios/:path*', '/']
}

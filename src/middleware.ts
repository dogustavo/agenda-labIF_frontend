import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('user-auth')

  if (authToken) {
    const response = NextResponse.redirect(
      new URL('/login', request.url)
    )

    response.cookies.set('user-auth', '', {
      maxAge: -1,
      path: '/'
    })

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login']
}

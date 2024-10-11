import { USER_ROLES } from 'enums/Roles.enums'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function routeMiddleware(request: NextRequest) {
  const userRole = request.cookies.get('user-role')?.value
  const authToken = request.cookies.get('user-auth')?.value

  if (!authToken) {
    const response = NextResponse.redirect(
      new URL('/login', request.url)
    )

    response.cookies.set('user-role', '', {
      maxAge: -1,
      path: '/'
    })
    response.cookies.set('user-auth', '', {
      maxAge: -1,
      path: '/'
    })

    return response
  }

  if (userRole !== USER_ROLES.USER_ADMIN) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

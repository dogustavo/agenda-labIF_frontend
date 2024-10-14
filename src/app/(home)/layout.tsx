import { Nav } from 'common'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

import ReactQueryProvider from 'provider/reactQueryProvider'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = cookies().get('user-auth')?.value

  if (!token) {
    redirect('/login')
  }

  return (
    <ReactQueryProvider>
      <Nav />
      <main>{children}</main>
    </ReactQueryProvider>
  )
}

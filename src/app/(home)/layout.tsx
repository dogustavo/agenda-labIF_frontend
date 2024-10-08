import { Nav } from 'common'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <Nav />
      <div>{children}</div>
    </>
  )
}

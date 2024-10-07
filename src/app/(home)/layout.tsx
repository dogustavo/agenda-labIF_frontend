export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <header>
        <span>menu</span>
      </header>
      <main>{children}</main>
    </>
  )
}

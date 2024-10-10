import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.scss'

import NextTopLoader from 'nextjs-toploader'

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700']
})

export const metadata: Metadata = {
  title: 'LabIF Maker',
  description:
    'Painel para agendamento dos equipamentos disponíves no LabIF Maker Itapetininga.'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <link
          rel="icon"
          href="/favicon.png"
          sizes="any"
          type="image/png"
        />
      </head>
      <body className={roboto.className}>
        <NextTopLoader
          color="var(--color-primary)"
          initialPosition={0.08}
          height={3}
          zIndex={8}
          showSpinner={false}
        />
        {children}
      </body>
    </html>
  )
}

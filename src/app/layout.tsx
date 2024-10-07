import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import './globals.scss'

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
      <body className={roboto.className}>{children}</body>
    </html>
  )
}

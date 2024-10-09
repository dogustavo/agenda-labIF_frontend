import { cookies } from 'next/headers'
import styled from './styles.module.scss'
import { redirect } from 'next/navigation'

export default async function Home() {
  const token = cookies().get('user-auth')?.value

  if (!token) {
    redirect('/login')
  }

  return (
    <main className={styled['main-page']}>
      <h1>Bem vindo</h1>
    </main>
  )
}

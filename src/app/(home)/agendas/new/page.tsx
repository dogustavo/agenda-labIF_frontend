import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function NewSchedule() {
  const token = cookies().get('user-auth')?.value

  if (!token) {
    redirect('/login')
  }

  return (
    <main>
      <h1>Nova agenda</h1>
    </main>
  )
}

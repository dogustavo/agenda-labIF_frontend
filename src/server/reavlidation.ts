'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function revalidateGeneral({
  redirectTo,
  path
}: {
  path: string
  redirectTo: string
}) {
  revalidatePath(path)
  redirect(redirectTo)
}

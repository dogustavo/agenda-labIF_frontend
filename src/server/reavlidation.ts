'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function revalidateAll() {
  revalidatePath('/agendas')
  redirect('/agendas/novo')
}

export async function revalidateEquipaments(redirectTo: string) {
  revalidatePath('/equipamentos')
  redirect(redirectTo)
}

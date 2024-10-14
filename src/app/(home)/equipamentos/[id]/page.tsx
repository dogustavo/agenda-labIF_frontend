import { Container, PageFormHeader } from 'common'
import { redirect } from 'next/navigation'

import styled from './styles.module.scss'
import { getEquipament } from 'services'

import { EditEquipamentForm } from 'views/equipamentos'

export default async function EditEquipament({
  params
}: {
  params: { id: string }
}) {
  const { error, data: equipament } = await getEquipament(params.id)

  if (error?.statusCode === 401) {
    return redirect('/login')
  }

  return (
    <section className={styled['main-schedules-new']}>
      <Container>
        <PageFormHeader title="Editar equipamento" />

        {equipament && Object.keys(equipament).length ? (
          <EditEquipamentForm equipament={equipament} />
        ) : (
          <div>
            <p>Equipamento não encontrado</p>
          </div>
        )}
      </Container>
    </section>
  )
}

import { Container } from 'common'

import styled from './styles.module.scss'

import Image from 'next/image'
import { IEquipaments } from 'types/equipaments'
import Link from 'next/link'

import { formatHour } from 'utils/time'

export default function Equipaments({
  equipaments
}: {
  equipaments?: IEquipaments[]
}) {
  if (!equipaments?.length) {
    return (
      <Container>
        <div className={styled['empty-equipaments']}>
          <Image
            src="/svg/search.svg"
            alt="Icone de lupa no centro do botão de pesquisar"
            width={50}
            height={50}
            className={styled['search-image']}
          />

          <div className={styled['not-found-content']}>
            <h3>Nenhum equipamento encontrado.</h3>
          </div>
        </div>
      </Container>
    )
  }

  return (
    <div className={styled['equipaments-section']}>
      <div className={styled['equipament-table-header']}>
        <span>Nome:</span>
        <span>Disponível apartir de:</span>
        <span>Disponível até:</span>
        <span></span>
      </div>
      <div className={styled['equipaments-wrapper']}>
        {equipaments.map((equipament) => (
          <div
            className={styled['equipament-item']}
            key={equipament.id}
          >
            <div className={styled['equipament-info']}>
              <span>Nome:</span>
              <p>{equipament.equipamentName}</p>
            </div>
            <div className={styled['equipament-info']}>
              <span>Disponível apartir de:</span>
              <p>{formatHour(equipament.availableFrom)}</p>
            </div>
            <div className={styled['equipament-info']}>
              <span>Disponível até:</span>
              <p>{formatHour(equipament.availableTo)}</p>
            </div>
            <div className={styled['equipament-info']}>
              <Link
                className={styled['action-button']}
                href={`/equipamentos${equipament.id}`}
              >
                <Image
                  src="/svg/edit.svg"
                  alt="Icone de lapes no centro do botão editar equipamento"
                  width={22}
                  height={22}
                />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

import Image from 'next/image'

import styled from './styles.module.scss'
import Link from 'next/link'

export default function GoBack({ path }: { path: string }) {
  return (
    <Link href={path} className={styled['go-back']}>
      <Image
        src="/svg/arrow_right.svg"
        width={16}
        height={16}
        alt="icone de voltar"
      />
      Voltar
    </Link>
  )
}

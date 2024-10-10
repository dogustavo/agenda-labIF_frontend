import Image from 'next/image'
import styled from './styles.module.scss'
import { ToastStore, useToast } from 'store/notification'

export default function ToastHeader({ title }: { title: string }) {
  const { setCloseToast } = useToast((state: ToastStore) => state)

  return (
    <div className={styled['toast-header']}>
      <h4>{title}</h4>

      <button type="button" onClick={setCloseToast}>
        <Image
          src="/svg/close.svg"
          width={24}
          height={24}
          alt="Icone X para fechar o modal"
        />
      </button>
    </div>
  )
}

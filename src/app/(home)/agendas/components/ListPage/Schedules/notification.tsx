'use client'

import { Toast } from 'common'
import { ToastStore, useToast } from 'store/notification'

export default function Notification() {
  const { type, path } = useToast((state: ToastStore) => state)

  if (!type) {
    return ''
  }

  if (path !== '/agendas') {
    return ''
  }

  return type === 'success' ? (
    <Toast.Root>
      <Toast.Header title="Sucesso!" />
      <Toast.Body>
        <p>Avaliação enviada com sucesso</p>
      </Toast.Body>
    </Toast.Root>
  ) : (
    <Toast.Root>
      <Toast.Header title="Ops!" />
      <Toast.Body>
        <p>Ocorreu um erro com a avaliação, tente novamente</p>
      </Toast.Body>
    </Toast.Root>
  )
}

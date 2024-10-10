import styled from './styles.module.scss'

export function ModalBody({
  children
}: {
  children: React.ReactNode
}) {
  return <div className={styled['modal-body']}>{children}</div>
}

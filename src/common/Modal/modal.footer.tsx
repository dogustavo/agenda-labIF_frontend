import styled from './styles.module.scss'

export function ModalFooter({
  children
}: {
  children: React.ReactNode
}) {
  return <div className={styled['modal-footer']}>{children}</div>
}

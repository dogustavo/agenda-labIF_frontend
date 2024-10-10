import styled from './styles.module.scss'

export default function ToastBody({
  children
}: {
  children: React.ReactNode
}) {
  return <div className={styled['toast-body']}>{children}</div>
}

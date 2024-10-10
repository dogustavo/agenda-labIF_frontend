'use client'

import { useEffect, useRef } from 'react'
import styled from './styles.module.scss'
import { ToastStore, useToast } from 'store/notification'

let timer: NodeJS.Timeout

export default function ToastRoot({
  children
}: {
  children: React.ReactNode
}) {
  const progressRef = useRef<HTMLDivElement | null>(null)
  const { isOpen, setCloseToast } = useToast(
    (state: ToastStore) => state
  )

  useEffect(() => {
    timer = setTimeout(() => {
      setCloseToast()
    }, 3000)

    return () => clearTimeout(timer)
  }, [isOpen, setCloseToast])

  const handleMouseEnter = () => {
    clearTimeout(timer)

    if (progressRef?.current) {
      progressRef.current.style.animationPlayState = 'paused'
    }
  }

  const handleMouseLeave = () => {
    if (progressRef.current && progressRef.current.parentElement) {
      const remainingTime =
        (progressRef.current.offsetWidth /
          progressRef.current.parentElement.offsetWidth) *
        4000

      progressRef.current.style.animationPlayState = 'running'

      timer = setTimeout(() => {
        setCloseToast()
      }, remainingTime)
    }
  }

  return (
    <div
      className={styled['toast-root']}
      data-state={isOpen ? 'open' : 'closed'}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  )
}

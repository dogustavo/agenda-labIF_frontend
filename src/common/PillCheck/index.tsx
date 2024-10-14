'use client'
import { useFormContext } from 'react-hook-form'
import styled from './styles.module.scss'
import { InputHTMLAttributes } from 'react'
import classNames from 'classnames'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
}

export default function PillCheckbox({
  name,
  label,
  ...rest
}: IProps) {
  const {
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div
      className={classNames(styled.checkbox, {
        [styled['has-error']]: !!errors[name]
      })}
    >
      <input
        {...rest}
        {...register(name)}
        id={`${name}-${label}`}
        name={name}
        value={label}
        type="checkbox"
      />
      <label htmlFor={`${name}-${label}`}>{label}</label>
    </div>
  )
}

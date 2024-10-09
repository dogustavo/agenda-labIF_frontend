'use client'

import React, { InputHTMLAttributes } from 'react'
import { useFormContext } from 'react-hook-form'
import classnames from 'classnames'
import styled from './style.module.scss'

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  name: string
  required?: boolean
  placeholder?: string
  type: string
}

export default function Input({
  label,
  name,
  type,
  required,
  placeholder,
  ...rest
}: IProps) {
  const {
    watch,
    register,
    formState: { errors }
  } = useFormContext()

  return (
    <div className={styled.content}>
      <input
        {...register(name, { required })}
        {...rest}
        className={classnames(styled['input-field'], {
          [styled['has-error']]: !!errors[name]
        })}
        id={name}
        type={type}
        placeholder={placeholder}
      />

      <label
        className={classnames(styled['input-label'], {
          [styled.active]: !!watch(name),
          [styled['has-error']]: !!errors[name]
        })}
        htmlFor={name}
      >
        {label}
      </label>

      {errors[name] && (
        <p className={styled.error}>
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  )
}

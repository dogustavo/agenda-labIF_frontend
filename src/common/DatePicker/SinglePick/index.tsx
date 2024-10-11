'use client'
import { useFormContext, Controller } from 'react-hook-form'

import DatePicker, { registerLocale } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { ptBR } from 'date-fns/locale'

import styled from '../styles.module.scss'
import classNames from 'classnames'
import { getDay } from 'date-fns'

interface IDateProps {
  name: string
  label: string
  placeholder?: string
}

registerLocale('pt-BR', ptBR)

export default function DatePickerSingle({
  name,
  placeholder,
  label
}: IDateProps) {
  const {
    control,
    formState: { errors },
    watch
  } = useFormContext()

  const isWeekday = (date: Date) => {
    const day = getDay(date)
    return day !== 0 && day !== 6
  }

  const today = new Date()

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <div className={styled.content}>
          <DatePicker
            {...field}
            name={name}
            onChange={field.onChange}
            selected={field.value}
            withPortal
            placeholderText={placeholder}
            locale="pt-BR"
            filterDate={isWeekday}
            minDate={today}
            dateFormat="dd/MM/yyyy"
            className={classNames(styled['date-picker'], {
              [styled['has-error']]: Boolean(errors[name])
            })}
          />

          <label
            className={classNames(styled['input-label'], {
              [styled.active]: !!watch(name),
              [styled['has-error']]: Boolean(errors[name])
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
      )}
    />
  )
}

'use client'
import { useFormContext, Controller } from 'react-hook-form'

import DatePicker, { registerLocale } from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'
import { ptBR } from 'date-fns/locale'

import styled from './styles.module.scss'
import classNames from 'classnames'

interface IDateProps {
  name: string
  label: string
  placeholder?: string
}

registerLocale('pt-BR', ptBR)

export default function Date({
  name,
  placeholder,
  label
}: IDateProps) {
  const {
    control,
    formState: { errors },
    watch
  } = useFormContext()

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
            selected={field.value ? field.value[0] : null}
            startDate={field.value ? field.value[0] : null}
            endDate={field.value ? field.value[1] : null}
            withPortal
            selectsRange
            placeholderText={placeholder}
            locale="pt-BR"
            dateFormat="dd/MM/yyyy"
            className={styled['date-picker']}
          />

          <label
            className={classNames(styled['input-label'], {
              [styled.active]: !!watch(name),
              [styled['has-error']]: !!errors[name]
            })}
            htmlFor={name}
          >
            {label}
          </label>
        </div>
      )}
    />
  )
}

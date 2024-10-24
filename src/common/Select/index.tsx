'use client'

import { useFormContext, Controller } from 'react-hook-form'

import SelectComponent from './select'

import styled from './styles.module.scss'

interface ISelectProps {
  options: IOptions[] | []
  name: string
  placeholder?: string
  defaultValue?: string
}

interface IOptions {
  label: string
  value: string | number
}

export default function Select({
  options,
  placeholder,
  name,
  defaultValue
}: ISelectProps) {
  const {
    control,
    formState: { errors }
  } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div>
          <SelectComponent
            {...field}
            onChange={field.onChange}
            value={field.value || defaultValue}
            options={options}
            hasError={Boolean(errors[name])}
            placeholder={placeholder || 'Selecione uma opção'}
          />
          {errors[name] && (
            <p className={styled['error']}>
              {errors[name]?.message as string}
            </p>
          )}
        </div>
      )}
    />
  )
}

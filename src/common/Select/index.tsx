'use client'

import { useFormContext, Controller } from 'react-hook-form'

import SelectComponent from './select'

interface ISelectProps {
  options: IOptions[]
  name: string
  placeholder?: string
}

interface IOptions {
  label: string
  value: string
}

export default function Select({
  options,
  placeholder,
  name
}: ISelectProps) {
  const { control } = useFormContext()

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <SelectComponent
          {...field}
          onChange={field.onChange}
          options={options}
          placeholder={placeholder || 'Selecione uma opção'}
        />
      )}
    />
  )
}

import React from 'react'
import * as Select from '@radix-ui/react-select'

import classnames from 'classnames'
import styled from './styles.module.scss'
import Image from 'next/image'

interface ISelectProps {
  options: IOptions[]
  placeholder: string
  onChange: () => void
  hasError: boolean
}

interface IOptions {
  label: string
  value: string
}

const SelectComponent = React.forwardRef<
  HTMLButtonElement,
  ISelectProps
>(({ options, placeholder, onChange, hasError, ...rest }, ref) => {
  return (
    <Select.Root onValueChange={onChange} {...rest}>
      <Select.Trigger
        title={placeholder}
        className={classnames(styled['select-trigger'], {
          [styled['has-error']]: hasError
        })}
        ref={ref}
      >
        <Select.Value
          className={styled['select-item-value']}
          placeholder={placeholder}
        />
        <Select.Icon className={styled['select-icon']}>
          <Image
            src="/svg/arrow_down.svg"
            width={24}
            height={24}
            alt="Chevron down"
          />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className={styled['select-content']}>
          <Select.Viewport className={styled['select-viewport']}>
            <Select.Group>
              {options.map((option, id) => (
                <Select.Item
                  key={id}
                  className={styled['select-item']}
                  value={option.value}
                >
                  <Select.ItemText>{option.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Group>
          </Select.Viewport>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
})

SelectComponent.displayName = 'SelectComponent'
export default SelectComponent

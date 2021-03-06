import React, { ReactText, useEffect, useRef, useState } from 'react'
import { ViewStyle } from 'react-native'
import Picker, { PickerSelectProps } from 'react-native-picker-select'

import { useField } from '@unform/core'

import { InputCoreProps } from 'packages/inputs/components/Input'
import InputInfo from 'packages/inputs/components/InputInfo'
import { InputLabel } from 'packages/inputs/input.styles'
import { useToggleThemeContext } from 'packages/styles/context'

import { SelectBackground, SelectContainer } from './components.styles'

type PickerProps = Omit<PickerSelectProps, 'onValueChange'> & {
  onValueChange?: (value: string, index: number) => void
}

export interface SelectProps extends PickerProps, InputCoreProps {
  testID?: string
  defaultValue?: string
  containerStyle?: ViewStyle
  backgroundStyle?: ViewStyle
}

const Select: React.FC<SelectProps> = ({ children, ...props }) => {
  const inputRef = useRef<ValueRef<Picker, string>>(null)

  const { registerField, ...field } = useField(props.name)

  const { theme } = useToggleThemeContext()

  const [value, setValue] = useState(props.defaultValue || field.defaultValue)

  function handleChangeValue(value: ReactText) {
    const newValue = String(value)

    inputRef?.current && (inputRef.current.value = newValue)

    setValue(newValue)
  }

  useEffect(() => {
    registerField({
      name: field.fieldName,
      ref: inputRef.current,
      path: 'value',
    })
  }, [registerField, field.fieldName])

  useEffect(() => {
    inputRef.current &&
      (inputRef.current.value = props.defaultValue || field.defaultValue)

    setValue(props.defaultValue || field.defaultValue)
  }, [field.defaultValue, props.defaultValue])

  return (
    <SelectContainer testID={props.testID} style={props.containerStyle}>
      <InputLabel>{props.label}</InputLabel>
      <SelectBackground style={props.backgroundStyle}>
        <Picker
          {...props}
          ref={inputRef}
          value={value}
          style={{
            inputAndroid: {
              color: theme.input.active_text,

              height:
                props.backgroundStyle?.minHeight ||
                props.backgroundStyle?.height ||
                40,
            },
            inputIOS: {
              height:
                props.backgroundStyle?.minHeight ||
                props.backgroundStyle?.height ||
                40,
            },
          }}
          onValueChange={(value, index) => {
            handleChangeValue(value)

            props.onValueChange?.(value, index)
          }}
          onOpen={field.clearError}
        />
      </SelectBackground>

      <InputInfo informative={!field.error}>
        {field.error || props.info}
      </InputInfo>

      {children}
    </SelectContainer>
  )
}

export default Select

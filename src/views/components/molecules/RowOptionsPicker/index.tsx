import React, { Fragment, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

import { useField } from '@unform/core'

import InputBottom from 'views/components/atoms/InputBottom'
import OptionButton from 'views/components/atoms/OptionButton'
import {
  Divider,
  InputContainer,
  InputLabel,
  Row,
} from 'views/styles/globalStyles'

interface ViewRef extends View {
  value: string
}

export interface RowOptionsPickerProps {
  name: string
  label: string
  options: Array<{
    label: string
    value: string
  }>
}

const RowOptionsPicker: React.FC<RowOptionsPickerProps> = (props) => {
  const ref = useRef<ViewRef>(null)

  const { fieldName, defaultValue, registerField, error } = useField(props.name)

  const [value, setValue] = useState(defaultValue)

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
    })

    ref?.current && (ref.current.value = defaultValue)
  }, [defaultValue, fieldName, registerField])

  function handleChangeValue(newValue: string) {
    ref?.current && (ref.current.value = newValue)

    setValue(newValue)
  }

  return (
    <InputContainer ref={ref}>
      <InputLabel>{props.label}</InputLabel>
      <Row>
        {props.options.map((opt, index) => (
          <Fragment key={opt.value}>
            <OptionButton
              label={opt.label}
              isActive={value === opt.value}
              onPress={() => handleChangeValue(opt.value)}
            />
            {props.options[index + 1] ? <Divider /> : null}
          </Fragment>
        ))}
      </Row>

      <InputBottom text={error}></InputBottom>
    </InputContainer>
  )
}

export default RowOptionsPicker

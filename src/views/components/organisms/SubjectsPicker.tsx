import React, { Fragment, useEffect, useRef, useState } from 'react'
import { View } from 'react-native'

import { useField } from '@unform/core'

import useSubjectsData from 'main/api/swr-hooks/useSubjectsData'

import InputInfo from 'views/components/atoms/InputInfo'
import OptionButton from 'views/components/atoms/OptionButton'
import {
  HorizontalDivider,
  InputContainer,
  InputLabel,
  Row,
} from 'views/styles/globalStyles'

interface ViewRef extends View {
  value: string[]
}

const SignUpSubjectsPicker: React.FC = () => {
  const ref = useRef<ViewRef>(null)

  const { fieldName, defaultValue, registerField, error } = useField('subjects')

  const { error: swrError, loading, subjects } = useSubjectsData()

  const [favoriteSubjects, setFavoriteSubjects] = useState<string[]>(
    defaultValue || []
  )

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'value',
    })

    ref?.current && (ref.current.value = defaultValue || [])
  }, [defaultValue, fieldName, registerField])

  function handleSubjectsChange(newSubjectId: string) {
    if (!ref.current)
      return setFavoriteSubjects([
        newSubjectId,
        favoriteSubjects[0],
        favoriteSubjects[1],
      ])

    if (favoriteSubjects.includes(newSubjectId)) {
      return
    }

    if (favoriteSubjects.length > 2) {
      const newSubjects = [
        newSubjectId,
        favoriteSubjects[0],
        favoriteSubjects[1],
      ]

      ref.current.value = newSubjects

      return setFavoriteSubjects(newSubjects)
    }

    const newSubjects = [newSubjectId, ...favoriteSubjects]

    ref.current.value = newSubjects

    return setFavoriteSubjects(newSubjects)
  }

  if (swrError) return <InputInfo>{String(swrError)}</InputInfo>

  if (!subjects || subjects?.length < 0 || loading)
    return <InputLabel>Carregando...</InputLabel>

  return (
    <InputContainer ref={ref}>
      <InputLabel>Escolha 03 matérias que você tem afinidade</InputLabel>

      {subjects.map((subject, index) => {
        if (index % 2 !== 0) return

        return (
          <Row
            style={{
              marginBottom: subjects[index + 1] ? 12 : 0,
              width: subjects[index + 1] ? '100%' : '48%',
            }}
            key={subject.id}
          >
            <OptionButton
              onPress={() => handleSubjectsChange(subject.id)}
              isActive={favoriteSubjects.includes(subject.id)}
            >
              {subject.name}
            </OptionButton>

            {subjects[index + 1] && (
              <Fragment>
                <HorizontalDivider />

                <OptionButton
                  onPress={() => handleSubjectsChange(subjects[index + 1].id)}
                  isActive={favoriteSubjects.includes(subjects[index + 1].id)}
                >
                  {subjects[index + 1].name}
                </OptionButton>
              </Fragment>
            )}
          </Row>
        )
      })}

      <InputInfo>{error}</InputInfo>
    </InputContainer>
  )
}

export default SignUpSubjectsPicker
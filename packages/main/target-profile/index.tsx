import { Route, useRoute } from '@react-navigation/native'
import React from 'react'

import StackPageTemplate from 'packages/components/StackPageTemplate'
import Student from 'packages/entities/Student'
import ShowStudent from 'packages/show-student-info'

export interface TargetProfileRouteProps {
  student: Modify<Student, { birth_date: number }>
}

const TargetProfile: React.FC = () => {
  const {
    params: { student },
  } = useRoute<Route<'TargetProfile', TargetProfileRouteProps>>()

  return (
    <StackPageTemplate title="Ver Perfil" withoutPadding>
      <ShowStudent
        student={{ ...student, birth_date: new Date(student.birth_date) }}
      />
    </StackPageTemplate>
  )
}

export default TargetProfile

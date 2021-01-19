import api from 'main/api'
import Student from 'main/entities/Student'
import { ApiError } from 'main/utils/interfaces'

import { GetStudentsReturn } from './interfaces'

export default async function getStudents(): Promise<GetStudentsReturn> {
  try {
    const response = await api.get<Student[]>('/users')

    return {
      students: response.data,
    }
  } catch (error) {
    if (error.response) {
      const { error: title, message } = error.response.data as ApiError

      return {
        students: [],
        error: {
          title: title || 'ALGO DEU ERRADO!',
          message: message || String(JSON.stringify(error.response.data)),
        },
      }
    }

    return {
      students: [],
      error: {
        title: error.name || 'ALGO DEU ERRADO!',
        message: error.message,
      },
    }
  }
}
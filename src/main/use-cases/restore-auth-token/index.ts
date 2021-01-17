import AsyncStorage from '@react-native-async-storage/async-storage'

import { STORAGE_AUTH_TOKEN } from 'shared/Constants'

import { RestoreAuthTokenReturn } from './interfaces'

export default async function restoreAuthToken(): Promise<RestoreAuthTokenReturn> {
  const storageToken = await AsyncStorage.getItem(STORAGE_AUTH_TOKEN.TOKEN_KEY)

  const expirationValue = await AsyncStorage.getItem(
    STORAGE_AUTH_TOKEN.EXPIRATION_KEY
  )

  if (!storageToken || !expirationValue) {
    AsyncStorage.multiRemove([
      STORAGE_AUTH_TOKEN.EXPIRATION_KEY,
      STORAGE_AUTH_TOKEN.TOKEN_KEY,
    ])

    return {
      token: null,
    }
  }

  const expirationDate = new Date(expirationValue)

  const HOUR_IN_MILLISECONDS = 60000

  if (Date.now() - HOUR_IN_MILLISECONDS >= expirationDate.getTime()) {
    return { token: null }
  }

  return { token: storageToken }
}
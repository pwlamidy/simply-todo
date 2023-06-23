import { StateCreator } from 'zustand'
import { User } from 'firebase/auth'

type AuthData = {
  accessToken: string
  refreshToken: string
  user: User | null
}

export interface AuthSlice {
  accessToken: string
  refreshToken: string
  user: User | null
  setAuthData: ({ accessToken, refreshToken, user }?: AuthData) => void
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  AuthSlice
> = (set) => ({
  accessToken: '',
  refreshToken: '',
  user: null,
  setAuthData: ({ accessToken, refreshToken, user } = {} as AuthData) => {
    set(
      () => ({
        accessToken: accessToken,
        refreshToken: refreshToken,
        user: user
      }),
      false,
      'setAuthData'
    )
  },
})

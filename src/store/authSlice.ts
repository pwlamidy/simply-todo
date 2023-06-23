import { StateCreator } from 'zustand'
import { User as FirebaseUser } from 'firebase/auth'

type AuthData = {
  accessToken: string
  refreshToken: string
  user: FirebaseUser | null
}

export interface AuthSlice {
  accessToken: string
  refreshToken: string
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

import { StateCreator } from 'zustand'

type AuthData = {
  accessToken: string
  refreshToken: string
}

export interface AuthSlice {
  accessToken: string
  refreshToken: string
  setAuthData: ({ accessToken, refreshToken }?: AuthData) => void
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  AuthSlice
> = (set) => ({
  accessToken: '',
  refreshToken: '',
  setAuthData: ({ accessToken, refreshToken } = {} as AuthData) => {
    set(
      () => ({
        accessToken: accessToken,
        refreshToken: refreshToken,
      }),
      false,
      'setAuthData'
    )
  },
})

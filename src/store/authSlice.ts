import { StateCreator } from 'zustand'

export interface AuthSlice {
  accessToken: string
  setAuthData: (accessToken: string) => void
}

export const createAuthSlice: StateCreator<
  AuthSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  AuthSlice
> = (set) => ({
  accessToken: '',
  setAuthData: (accessToken) => {
    set(
      () => ({
        accessToken: accessToken,
      }),
      false,
      'setAuthData'
    )
  }
})

import { StateCreator } from 'zustand'

export interface AppSlice {
  loading: boolean
}

export const createAppSlice: StateCreator<
  AppSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  AppSlice
> = (set) => ({
  loading: false,
  toggleLoading: async () => {
    set(
      (state) => ({
        loading: !state.loading,
      }),
      false,
      'toggleLoading'
    )
  },
})

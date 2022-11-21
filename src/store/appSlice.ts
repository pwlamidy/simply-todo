import { StateCreator } from 'zustand'

export interface AppSlice {
  loading: boolean

  // for multi-select todos
  selected: string[]
  toggleSelected: (id: string) => void
  clearSelected: () => void
}

export const createAppSlice: StateCreator<
  AppSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  AppSlice
> = (set) => ({
  loading: false,
  selected: [],
  toggleLoading: async () => {
    set(
      (state) => ({
        loading: !state.loading,
      }),
      false,
      'toggleLoading'
    )
  },
  toggleSelected: (id) => {
    set(
      (state) => {
        if (state.selected.indexOf(id) > -1) {
          return {
            selected: state.selected.filter((s) => s !== id),
          }
        } else {
          return {
            selected: state.selected.concat(id),
          }
        }
      },
      false,
      'toggleSelected'
    )
  },
  clearSelected: () => {
    set((state) => ({ selected: [] }), false, 'clearSelected')
  },
})

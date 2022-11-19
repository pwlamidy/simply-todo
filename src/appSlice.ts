import { StateCreator } from 'zustand'

export interface AppSlice {
  loading: boolean

  // for multi-select todos
  isSelectMode: boolean
  toggleSelectMode: () => void
  selected: string[]
  addSelected: (id: string) => void
}

export const createAppSlice: StateCreator<
  AppSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  AppSlice
> = (set) => ({
  loading: false,
  isSelectMode: false,
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
  toggleSelectMode: () => {
    set(
      (state) => {
        // clear selected if select->unselect
        if (state.isSelectMode) {
          return ({
            selected: [],
            isSelectMode: !state.isSelectMode,
          })
        } else {
          return ({
            isSelectMode: !state.isSelectMode,
          })
        }
      },
      false,
      'toggleSelectMode'
    )
  },
  addSelected: (id) => {
    set(
      (state) => ({
        selected: state.selected.concat(id),
      }),
      false,
      'addSelected'
    )
  },
})

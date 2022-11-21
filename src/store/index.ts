import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { AppSlice, createAppSlice } from './appSlice'
import { createTodosSlice, TodosSlice } from './todosSlice'

export const useStore = create<AppSlice & TodosSlice>()(
  devtools(
    immer((...a) => ({
      ...createAppSlice(...a),
      ...createTodosSlice(...a),
    }))
  )
)

import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { AppSlice, createAppSlice } from './appSlice'
import { AuthSlice, createAuthSlice } from './authSlice'
import { createTodosSlice, TodosSlice } from './todosSlice'

export const useStore = create<AppSlice & TodosSlice & AuthSlice>()(
  devtools(
    immer((...a) => ({
      ...createAppSlice(...a),
      ...createTodosSlice(...a),
      ...createAuthSlice(...a),
    }))
  )
)

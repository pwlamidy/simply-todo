import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { AppSlice, createAppSlice } from './appSlice'
import { AuthSlice, createAuthSlice } from './authSlice'
import { createTodosSlice, TodosSlice } from './todosSlice'

export const useStore = create<AppSlice & TodosSlice & AuthSlice>()(
  devtools(
    immer(
      persist(
        (...a) => ({
          ...createAppSlice(...a),
          ...createTodosSlice(...a),
          ...createAuthSlice(...a),
        }),
        {
          // Configure persist middleware
          name: 'SIMPLY_TODO',
          getStorage: () => localStorage,
          partialize: (state) => ({
            accessToken: state.accessToken,
            refreshToken: state.refreshToken,
          }),
        }
      )
    )
  )
)

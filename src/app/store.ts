import create from 'zustand'
import { devtools } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { createTodosSlice, TodosSlice } from '../components/todosSlice'

export const useStore = create<TodosSlice>()(
  devtools(
    immer((...a) => ({
      ...createTodosSlice(...a),
    }))
  )
)

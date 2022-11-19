import { StateCreator } from 'zustand'
import { Todo } from '../../types'

export interface TodosSlice {
  todos: Todo[]
  initTodos: (todos: Todo[]) => void
  addTodo: () => void
  updateTodo: (todo: Todo) => void
  toggleComplete: (id: string) => void
}

export const createTodosSlice: StateCreator<
  TodosSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  TodosSlice
> = (set) => ({
  todos: [],
  initTodos: (todos: Todo[]) =>
    set(
      (state) => ({
        todos: todos,
      }),
      false,
      'initTodos'
    ),
  addTodo: () =>
    set(
      (state) => ({
        todos: [
          { id: state.todos.length.toString(), title: '' } as Todo,
          ...state.todos,
        ],
      }),
      false,
      'addTodo'
    ),
  updateTodo: (todo) =>
    set(
      (state) => ({
        todos: state.todos.map((t) => {
          if (t.id === todo.id) {
            return todo
          } else {
            return t
          }
        }),
      }),
      false,
      'updateTodo'
    ),
  toggleComplete: (id) =>
    set(
      (state) => ({
        todos: state.todos.map((t) => {
          if (t.id === id) {
            return { ...t, completed: !t.completed }
          } else {
            return t
          }
        }),
      }),
      false,
      'toggleComplete'
    ),
})

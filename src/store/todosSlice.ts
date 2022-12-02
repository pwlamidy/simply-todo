import { StateCreator } from 'zustand'
import { Todo } from '../../types'

export interface TodosSlice {
  todos: Todo[]
  initTodos: (todos: Todo[]) => void
  addTodo: (todo: Todo) => void
  updateTodo: (todo: Todo) => void
  deleteTodo: (id: string) => void
  toggleComplete: (id: string) => void
  monthlyTodos: Todo[]
  initMonthlyTodos: (todos: Todo[]) => void
}

export const createTodosSlice: StateCreator<
  TodosSlice,
  [['zustand/devtools', never], ['zustand/immer', never]],
  [],
  TodosSlice
> = (set) => ({
  todos: [],
  initTodos: async (todos) => {
    set(
      (state) => ({
        todos: todos,
      }),
      false,
      'initTodos'
    )
  },
  addTodo: async (todo) => {
    set(
      (state) => ({
        todos: [todo, ...state.todos],
      }),
      false,
      'addTodo'
    )
  },
  updateTodo: (todo) => 
    set(
      (state) => {
        const ids = state.todos.map(t => t.id)
    
        return ({
          todos: state.todos.map((t) => {
            if (t.id === todo.id) {
              return todo
            } else if (!t.id && ids.indexOf(todo.id) === -1) {
              // Update new todo
              return todo
            } else {
              return t
            }
          }),
        })
      },
      false,
      'updateTodo'
    ),
  deleteTodo: async (id) => {
    set(
      (state) => ({
        todos: state.todos.filter((t) => t.id !== id),
      }),
      false,
      'deleteTodo'
    )
  },
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
  monthlyTodos: [],
  initMonthlyTodos: async (todos) => {
    set(
      (state) => ({
        monthlyTodos: todos,
      }),
      false,
      'initMonthlyTodos'
    )
  },
})
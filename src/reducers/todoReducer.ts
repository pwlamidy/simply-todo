import { Todo } from '../../types'

// An enum with all the types of actions to use in our reducer
export enum TodoActionKind {
  INIT = 'INIT',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
  TOGGLE_COMPLETE = 'TOGGLE_COMPLETE',
}

// An interface for our actions
export interface TodoAction {
  type: TodoActionKind
  payload?: any
}

// An interface for our state
export interface TodoState {
  todos: Todo[]
}

export function todoReducer(state: TodoState, action: TodoAction) {
  const { id, title } = action.payload ?? {}
  
  switch (action.type) {
    case 'INIT':
      return Object.assign({}, state, {
        todos: action.payload.todos,
      })
    case 'ADD':
      return Object.assign({}, state, {
        todos: [{ id: `${state.todos.length}`, title: '' }, ...state.todos],
      })
    case 'UPDATE':
      return Object.assign({}, state, {
        todos: state.todos.map((t) => {
          if (t.id === id) {
            return {
              ...t,
              title,
            }
          } else {
            return t
          }
        }),
      })
    case 'TOGGLE_COMPLETE':
      return Object.assign({}, state, {
        todos: state.todos.map((t) => {
          if (t.id === id) {
            return {
              ...t,
              completed: !t.completed,
            }
          } else {
            return t
          }
        }),
      })
    default:
      return state
  }
}

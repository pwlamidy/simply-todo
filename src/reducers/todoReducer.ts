import { Todo } from "../../types"

// An enum with all the types of actions to use in our reducer
export enum TodoActionKind {
  INIT = 'INIT',
  ADD = 'ADD',
  UPDATE = 'UPDATE',
}

// An interface for our actions
export interface TodoAction {
  type: TodoActionKind;
  payload?: any;
}

// An interface for our state
export interface TodoState {
  todos: Todo[];
}

export function todoReducer(state: TodoState, action: TodoAction) {
  switch(action.type) {
    case 'INIT':
      return Object.assign({}, state, {
        todos: state.todos = action.payload.todos
      })
    case 'ADD':
      return Object.assign({}, state, {
        todos: state.todos.concat({ id: `${state.todos.length}`, title: '' })
      })
    case 'UPDATE':
        const { id, title } = action.payload
        return Object.assign({}, state, {
          todos: state.todos.map(t => {
            if (t.id === id) {
              return {
                ...t,
                title
              }
            } else {
              return t
            }
          })
        })
    default:
      return state
  }
}
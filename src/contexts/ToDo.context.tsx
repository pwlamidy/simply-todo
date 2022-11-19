import { createContext, Dispatch, useReducer } from 'react'
import { TodoAction, todoReducer, TodoState } from '../reducers/todoReducer'

type ToDoContextProps = {
  todoState: TodoState
  todoDispatch: Dispatch<TodoAction>
}

const todosInitState = { todos: [] }

const ToDoContext = createContext<ToDoContextProps>({
  todoState: todosInitState,
  todoDispatch: () => {},
})

const ToDoContextProvider = ({ children }: any) => {
  const [todoState, todoDispatch] = useReducer(todoReducer, todosInitState)

  return (
    <ToDoContext.Provider value={{ todoState, todoDispatch }}>
      {children}
    </ToDoContext.Provider>
  )
}

export { ToDoContext, ToDoContextProvider }

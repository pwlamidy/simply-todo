import { AddBox } from '@mui/icons-material'
import { Button, List } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { Todo } from '../../types'
import { useStore } from '../app/store'
import { addServerTodo, fetchTodos, updateServerTodo } from '../utils/api'
import EditToDoModal from './EditToDoModal'
import ToDoItem from './ToDoItem'

function ToDoItemList() {
  const { todos, initTodos, addTodo, updateTodo } = useStore()

  useEffect(() => {
    const getTodos = async () => {
      const todos = await fetchTodos()

      initTodos(todos)
    }

    getTodos()
  }, [initTodos])

  const addToDoHandler = async () => {
    const todo = await addServerTodo({
      title: '',
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    } as Todo)
    addTodo(todo)
  }

  const ontTitleChangeHandler = async (id: string, titleText: string) => {
    const todoInEdit = todos.find((t) => t.id === id)
    const updTodo = { ...todoInEdit, title: titleText, lastUpdatedAt: new Date() } as Todo
    await updateServerTodo(updTodo)
    updateTodo(updTodo)
  }

  return (
    <>
      <List sx={{ marginBottom: '60px' }}>
        {todos.map(({ id, title }, index) => (
          <ToDoItem
            key={index}
            id={id}
            title={title}
            ontTitleChangeHandler={(titleText: string) =>
              ontTitleChangeHandler(id, titleText)
            }
          />
        ))}
      </List>
      <EditToDoModal />
      <Box
        sx={{
          position: 'fixed',
          bottom: '56px',
          paddingBottom: '4px',
          width: '100%',
          backgroundColor: '#ffffff',
        }}
      >
        <Button variant="text" onClick={addToDoHandler}>
          <AddBox />
          Add
        </Button>
      </Box>
    </>
  )
}
export default ToDoItemList

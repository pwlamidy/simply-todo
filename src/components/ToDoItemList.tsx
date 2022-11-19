import { AddBox } from '@mui/icons-material'
import { Button, List } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { Todo } from '../../types'
import { useStore } from '../app/store'
import EditToDoModal from './EditToDoModal'
import ToDoItem from './ToDoItem'

function ToDoItemList() {
  const { todos, initTodos, addTodo, updateTodo } = useStore()

  useEffect(() => {
    initTodos(
      [...Array(10)].map((_, i) => {
        return {
          id: `${i}`,
          title: 'test',
          date: new Date(),
          time: new Date(),
        }
      }) as Todo[]
    )
  }, [])

  const addToDoHandler = () => {
    addTodo()
  }

  const ontTitleChangeHandler = (id: string, titleText: string) => {
    const todoInEdit = todos.find((t) => t.id === id)
    updateTodo({ ...todoInEdit, title: titleText } as Todo)
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

import { AddBox } from '@mui/icons-material'
import { Button, List } from '@mui/material'
import { Box } from '@mui/system'
import { useContext, useEffect } from 'react'
import { ToDoContext } from '../contexts/ToDo.context'
import { TodoActionKind } from '../reducers/todoReducer'
import EditToDoModal from './EditToDoModal'
import ToDoItem from './ToDoItem'

function ToDoItemList() {
  const { todoState, todoDispatch } = useContext(ToDoContext)

  useEffect(() => {
    todoDispatch({
      type: TodoActionKind.INIT,
      payload: {
        todos: [...Array(10)].map((_, i) => {
          return {
            id: `${i}`,
            title: 'test',
            date: new Date(),
            time: new Date(),
          }
        }),
      },
    })
  }, [todoDispatch])

  const addToDoHandler = () => {
    todoDispatch({ type: TodoActionKind.ADD })
  }

  const ontTitleChangeHandler = (id: string, titleText: string) => {
    todoDispatch({
      type: TodoActionKind.UPDATE,
      payload: { id, title: titleText },
    })
  }
  return (
    <>
      <List sx={{ marginBottom: '60px' }}>
        {todoState.todos.map(({ id, title }, index) => (
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
          backgroundColor: '#ffffff'
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

import { AddBox as AddBoxIcon, Rule as RuleIcon } from '@mui/icons-material'
import { Button, Grid, List } from '@mui/material'
import { useEffect } from 'react'
import { Todo } from '../../types'
import { useStore } from '../app/store'
import { addServerTodo, fetchTodos, updateServerTodo } from '../utils/api'
import EditToDoModal from './EditToDoModal'
import ToDoItem from './ToDoItem'

function ToDoItemList() {
  const { todos, initTodos, addTodo, updateTodo, isSelectMode } = useStore()
  const { toggleSelectMode } = useStore()

  useEffect(() => {
    const getTodos = async () => {
      const todos = await fetchTodos()

      initTodos(todos)
    }

    getTodos()
  }, [initTodos])

  const addToDoHandler = async () => {
    const todo = await addServerTodo({ title: '' } as Todo)
    addTodo(todo)
  }

  const ontTitleChangeHandler = async (id: string, titleText: string) => {
    const todoInEdit = todos.find((t) => t.id === id)
    const updTodo = {
      ...todoInEdit,
      title: titleText,
    } as Todo
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
      <Grid
        container
        sx={{
          position: 'fixed',
          bottom: '56px',
          paddingBottom: '4px',
          width: '100%',
          backgroundColor: '#ffffff',
        }}
      >
        <Grid xs={6} item>
          <Button variant="text" onClick={addToDoHandler}>
            <AddBoxIcon />
            Add
          </Button>
        </Grid>
        <Grid xs={6} display="flex" justifyContent="end" item>
          <Button variant="text" onClick={toggleSelectMode}>
            <RuleIcon />
            {isSelectMode ? "Unselect" : "Select"}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
export default ToDoItemList

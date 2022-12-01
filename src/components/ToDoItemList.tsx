import { AddBox as AddBoxIcon, Rule as RuleIcon } from '@mui/icons-material'
import { Button, Grid, List } from '@mui/material'
import { useEffect, useMemo } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Todo } from '../../types'
import { useStore } from '../store'
import { fetchTodos } from '../utils/api'
import EditToDoModal from './EditToDoModal'
import ToDoItem from './ToDoItem'

function ToDoItemList() {
  const { todos, initTodos, addTodo, clearSelected, selected } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()

  useEffect(() => {
    const getTodos = async () => {
      const todos = await fetchTodos()

      initTodos(todos)
    }

    getTodos()
  }, [initTodos])

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const addToDoHandler = async () => {
    const hasEmptyTodo = todos.findIndex((t) => !t.title) !== -1
    if (!hasEmptyTodo) {
      addTodo({ title: '' } as Todo)
      scrollToTop()
    }
  }

  const isSelectMode = useMemo(() => {
    return new URLSearchParams(searchParams).get('mode') === 'select'
  }, [searchParams])

  useEffect(() => {
    if (!isSelectMode) {
      clearSelected()
    }
  }, [isSelectMode, clearSelected])

  return (
    <>
      <List sx={{ marginBottom: '60px' }}>
        {todos.map(({ id, title }, index) => {
          const currTodo = todos.find((t) => t.id === id)
          return (
            currTodo && (
              <ToDoItem
                key={index}
                todo={currTodo}
                shouldFocus={id === todos[0].id && title === ''}
              />
            )
          )
        })}
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
        {!isSelectMode && (
          <Grid xs={6} item>
            <Button variant="text" onClick={addToDoHandler}>
              <AddBoxIcon />
              Add
            </Button>
          </Grid>
        )}
        {isSelectMode && (
          <Grid
            xs={6}
            item
            display="flex"
            alignItems="center"
            sx={{
              paddingLeft: '10px',
            }}
          >
            Selected: {selected.length}
          </Grid>
        )}
        <Grid xs={6} display="flex" justifyContent="end" item>
          <Button
            variant="text"
            onClick={() => {
              if (isSelectMode) {
                navigate(-1)
              } else {
                setSearchParams({ mode: 'select' })
              }
            }}
          >
            <RuleIcon />
            {isSelectMode ? 'Cancel' : 'Select'}
          </Button>
        </Grid>
      </Grid>
    </>
  )
}
export default ToDoItemList

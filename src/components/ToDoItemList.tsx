import { AddBox as AddBoxIcon, Rule as RuleIcon } from '@mui/icons-material'
import { Button, Grid, List } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FetchTodoParam, Todo } from '../../types'
import { useStore } from '../store'
import { fetchTodos } from '../utils/api'
import { PAGE_SIZE } from '../utils/constants'
import EditToDoModal from './EditToDoModal'
import ToDoItem from './ToDoItem'

function ToDoItemList() {
  const { todos, initTodos, addTodo, clearSelected, selected } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [currPage, setCurrPage] = useState(1)
  const [todosTotal, setTodosTotal] = useState(0)

  useEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    const getTodos = async () => {
      const todosResult = await fetchTodos()

      setTodosTotal(todosResult['page']['total'])

      initTodos(todosResult['data'])
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
        <InfiniteScroll
          dataLength={todos ? todos.length : 0}
          next={async () => {
            const nextTodosResult = await fetchTodos({
              page: currPage + 1,
            } as FetchTodoParam)
            initTodos([...todos, ...nextTodosResult['data']])
            setCurrPage((prev) => prev + 1)
          }}
          hasMore={currPage * PAGE_SIZE < todosTotal}
          loader={<h4>Loading...</h4>}
        >
          {todos.map((currTodo, index) => (
            <ToDoItem
              key={currTodo.id ?? new Date().toString()}
              todo={currTodo}
              shouldFocus={currTodo.id === todos[0].id && currTodo.title === ''}
            />
          ))}
        </InfiniteScroll>
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

import { AddBox as AddBoxIcon, Rule as RuleIcon } from '@mui/icons-material'
import { Button, Grid, List } from '@mui/material'
import {
  useEffect,
  useMemo,
  useRef,
  useState
} from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FetchTodoParam, Todo } from '../../types'
import { useStore } from '../store'
import { addServerTodo, fetchTodos } from '../utils/api/todo'
import { PAGE_SIZE } from '../utils/constants'
import EditToDoModal from './EditToDoModal'
import ToDoItem from './ToDoItem'

function ToDoItemList() {
  const { todos, initTodos, addTodo, clearSelected, selected } = useStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [currPage, setCurrPage] = useState(1)
  const [todosTotal, setTodosTotal] = useState(0)
  const [focusId, setFocusId] = useState(null)
  const listRef = useRef<HTMLUListElement | null>(null)

  useEffect(() => {
    scrollToTop()
  }, [])

  useEffect(() => {
    if (
      currPage * PAGE_SIZE < todosTotal &&
      todos.length > 0 &&
      listRef.current &&
      listRef.current.getBoundingClientRect().bottom < window.screen.height - 56
    ) {
      fetchTodos({ page: currPage + 1 } as FetchTodoParam).then(
        (nextTodosResult: any) => {
          initTodos([...todos, ...nextTodosResult['data']])
          setCurrPage((prev) => prev + 1)
        }
      )
    }
  }, [listRef, todos, currPage, todosTotal, initTodos])

  useEffect(() => {
    initTodos([])

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
      const newTodo = await addServerTodo({ title: '' } as Todo)
      addTodo(newTodo)

      setFocusId(newTodo.id)

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
      <List sx={{ marginBottom: '60px' }} ref={listRef}>
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
              shouldFocus={currTodo.id === focusId}
              setFocusId={setFocusId}
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

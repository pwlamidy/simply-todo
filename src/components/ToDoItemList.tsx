import { AddBox as AddBoxIcon, Rule as RuleIcon } from '@mui/icons-material'
import { Button, Grid, List } from '@mui/material'
import {
  addDoc,
  collection,
  doc,
  getCountFromServer,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  where,
} from 'firebase/firestore'
import { useEffect, useMemo, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Todo } from '../../types'
import { auth, db } from '../firebase'
import { useStore } from '../store'
import { PAGE_SIZE } from '../utils/constants'
import EditToDoModal from './EditToDoModal'
import ToDoItem from './ToDoItem'

function ToDoItemList() {
  const { todos, initTodos, addTodo, clearSelected, selected, user } =
    useStore()
  const [searchParams, setSearchParams] = useSearchParams()
  const navigate = useNavigate()
  const [currPage, setCurrPage] = useState(1)
  const [todosTotal, setTodosTotal] = useState(0)
  const [focusId, setFocusId] = useState<string | null>(null)
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
      getDoc(doc(db, 'todos', todos[todos.length - 1].id)).then(
        (lastTodoDoc) => {
          getDocs(
            query(
              collection(db, 'todos'),
              where('userId', '==', auth.currentUser?.uid),
              orderBy('createdAt', 'desc'),
              startAfter(lastTodoDoc),
              limit(PAGE_SIZE)
            )
          ).then((querySnapshot) => {
            const newData: Todo[] = querySnapshot.docs.map(
              (t) => ({ ...t.data(), id: t.id } as Todo)
            )
            initTodos([...todos, ...newData])
            setCurrPage((prev) => prev + 1)
          })
        }
      )
    }
    // eslint-disable-next-line
  }, [listRef, todos, currPage, todosTotal, initTodos])

  useEffect(() => {
    initTodos([])

    const getTodosTotal = async () => {
      if (user !== null) {
        const countTotalQuery = query(
          collection(db, 'todos'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        )

        const countTotalSnapshot = await getCountFromServer(countTotalQuery)

        return countTotalSnapshot.data().count
      }

      return 0
    }

    const getTodos = async () => {
      const todosResult: Todo[] = []

      if (user !== null) {
        const totalCount = await getTodosTotal()

        const q = query(
          collection(db, 'todos'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc'),
          limit(PAGE_SIZE)
        )

        const querySnapshot = await getDocs(q)

        setTodosTotal(totalCount)

        querySnapshot.forEach((doc) => {
          todosResult.push({ ...doc.data(), id: doc.id } as Todo)
        })
      }

      initTodos(todosResult)
    }

    getTodos()
  }, [initTodos, user])

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const addToDoHandler = async () => {
    const hasEmptyTodo = todos.findIndex((t) => !t.title) !== -1
    if (!hasEmptyTodo) {
      const todoData: Todo = {
        title: '',
        createdAt: new Date(),
        lastUpdatedAt: new Date(),
      } as Todo
      const newTodo = await addDoc(collection(db, 'todos'), {
        userId: user?.uid,
        ...todoData,
      })
      addTodo({ ...todoData, id: newTodo.id } as Todo)

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
            let todoQuery = query(
              collection(db, 'todos'),
              where('userId', '==', auth.currentUser?.uid),
              orderBy('createdAt', 'desc'),
              limit(PAGE_SIZE)
            )
            if (todos.length > 0) {
              const lastTodoDoc = await getDoc(
                doc(db, 'todos', todos[todos.length - 1].id)
              )
              todoQuery = query(
                collection(db, 'todos'),
                where('userId', '==', auth.currentUser?.uid),
                orderBy('createdAt', 'desc'),
                startAfter(lastTodoDoc),
                limit(PAGE_SIZE)
              )
            }
            const querySnapshot = await getDocs(query(todoQuery))
            const newData: Todo[] = querySnapshot.docs.map(
              (doc) => ({ ...doc.data(), id: doc.id } as Todo)
            )
            initTodos([...todos, ...newData])
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

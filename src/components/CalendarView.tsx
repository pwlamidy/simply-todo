import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Box, List } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
  Timestamp,
  where,
} from 'firebase/firestore'
import { useEffect, useMemo, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useSearchParams } from 'react-router-dom'
import { Todo, TodosCount } from '../../types'
import { auth, db } from '../firebase'
import { useStore } from '../store'
import { PAGE_SIZE } from '../utils/constants'
import BasicStaticDatePicker from './BasicStaticDatePicker'
import ToDoItem from './ToDoItem'

function CalendarView() {
  const { todos, initTodos, todosCount, initTodosCount } = useStore()
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [searchParams, setSearchParams] = useSearchParams()
  const [currPage, setCurrPage] = useState(1)
  const [todosTotal, setTodosTotal] = useState(0)

  useEffect(() => {
    scrollToTop()
  }, [])

  const scrollToTop = () => {
    window.scrollTo(0, 0)
  }

  const handleDateChange = async (d: Dayjs) => {
    // Reset settings
    initTodos([])
    setCurrPage(1)

    setSearchParams(() => ({ date: d.format('YYYY-MM-DD') }))

    setSelectedDate(d)

    const q = query(
      collection(db, 'todos'),
      where('userId', '==', auth.currentUser?.uid),
      where('date', '>=', Timestamp.fromDate(d.startOf('day').toDate())),
      where('date', '<=', Timestamp.fromDate(d.endOf('day').toDate())),
      orderBy('date'),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)

    setTodosTotal(querySnapshot.size)

    const todosResult: Todo[] = []
    querySnapshot.forEach((doc) => {
      todosResult.push({ ...doc.data(), id: doc.id } as Todo)
    })

    initTodos(todosResult)
  }

  const handleMonthChange = async (m: Dayjs) => {
    initTodosCount([])

    const q = query(
      collection(db, 'todos'),
      where('userId', '==', auth.currentUser?.uid),
      where('date', '>=', Timestamp.fromDate(m.startOf('month').toDate())),
      where('date', '<=', Timestamp.fromDate(m.endOf('month').toDate())),
      orderBy('date'),
      orderBy('createdAt', 'desc')
    )

    const querySnapshot = await getDocs(q)

    const queryMonthlyCount: any = {}
    querySnapshot.forEach((d) => {
      if (d.data().date) {
        const todoDate = d.data().date.toDate().toString()
        if (Object.keys(queryMonthlyCount).indexOf(todoDate) > -1) {
          queryMonthlyCount[todoDate] += 1
        }
      }
    })
    const todosCount: TodosCount[] = Object.keys(queryMonthlyCount).map((d) => {
      return {
        date: new Date(d),
        total: queryMonthlyCount[d],
      }
    })

    initTodosCount(todosCount)
  }

  const isToday = useMemo(
    () => selectedDate.format('DD-MM-YYYY') !== dayjs().format('DD-MM-YYYY'),
    [selectedDate]
  )

  useEffect(() => {
    initTodos([])
    initTodosCount([])

    const getTodos = async () => {
      const currDate = dayjs(
        new URLSearchParams(searchParams).get('date') || Date.now()
      )
      setSelectedDate(currDate)

      // This month's todos
      const currMonthQuery = query(
        collection(db, 'todos'),
        where('userId', '==', auth.currentUser?.uid),
        where(
          'date',
          '>=',
          Timestamp.fromDate(currDate.startOf('month').toDate())
        ),
        where(
          'date',
          '<=',
          Timestamp.fromDate(currDate.endOf('month').toDate())
        ),
        orderBy('date'),
        orderBy('createdAt', 'desc')
      )

      const querySnapshot = await getDocs(currMonthQuery)

      const queryMonthlyCount: any = {}
      querySnapshot.forEach((queryDoc) => {
        if (queryDoc.data().date) {
          const todoDate = queryDoc.data().date.toDate().toString()
          if (Object.keys(queryMonthlyCount).indexOf(todoDate) > -1) {
            queryMonthlyCount[todoDate] += 1
          }
        }
      })
      const todosCount: TodosCount[] = Object.keys(queryMonthlyCount).map(
        (d) => {
          return {
            date: new Date(d),
            total: queryMonthlyCount[d],
          }
        }
      )

      initTodosCount(todosCount)

      // Today's todos
      const currDateQuery = query(
        collection(db, 'todos'),
        where('userId', '==', auth.currentUser?.uid),
        where(
          'date',
          '>=',
          Timestamp.fromDate(currDate.startOf('day').toDate())
        ),
        where('date', '<=', Timestamp.fromDate(currDate.endOf('day').toDate())),
        orderBy('date'),
        orderBy('createdAt', 'desc')
      )

      const currDateQuerySnapshot = await getDocs(currDateQuery)

      setTodosTotal(currDateQuerySnapshot.size)

      const currDateTodosResult: Todo[] = []
      currDateQuerySnapshot.forEach((doc) => {
        currDateTodosResult.push({ ...doc.data(), id: doc.id } as Todo)
      })

      initTodos(currDateTodosResult)
    }

    if (auth.currentUser) {
      getTodos()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams, initTodosCount, initTodos, auth.currentUser])

  return (
    <Box
      sx={{
        paddingBottom: '60px',
      }}
    >
      <BasicStaticDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleDateChange={handleDateChange}
        handleMonthChange={handleMonthChange}
        todosCount={todosCount}
      />
      <Box
        sx={{
          p: 2,
          height: '5%',
          fontSize: 18,
        }}
      >
        <div
          style={{
            display: 'flex',
          }}
          onClick={() => {
            if (isToday) {
              setSelectedDate(dayjs())
              handleDateChange(dayjs())
            }
          }}
        >
          {isToday && <ArrowBackIosNewIcon sx={{ paddingRight: 1 }} />}
          {selectedDate.format('DD-MM-YYYY')}
        </div>
      </Box>
      {todos.length > 0 && (
        <Box>
          <List>
            <InfiniteScroll
              dataLength={todos ? todos.length : 0}
              next={async () => {
                const lastTodoDoc = await getDoc(
                  doc(db, 'todos', todos[todos.length - 1].id)
                )
                getDocs(
                  query(
                    collection(db, 'todos'),
                    where('userId', '==', auth.currentUser?.uid),
                    where(
                      'date',
                      '>=',
                      Timestamp.fromDate(selectedDate.startOf('day').toDate())
                    ),
                    where(
                      'date',
                      '<=',
                      Timestamp.fromDate(selectedDate.endOf('day').toDate())
                    ),
                    orderBy('createdAt', 'desc'),
                    startAfter(lastTodoDoc),
                    limit(PAGE_SIZE)
                  )
                ).then((querySnapshot) => {
                  const newData: Todo[] = querySnapshot.docs.map(
                    (doc) => ({ ...doc.data(), id: doc.id } as Todo)
                  )
                  initTodos([...todos, ...newData])
                  setCurrPage((prev) => prev + 1)
                })
              }}
              hasMore={currPage * PAGE_SIZE < todosTotal}
              loader={<h4>Loading...</h4>}
            >
              {todos.map((currTodo, index) => (
                <ToDoItem
                  key={currTodo.id ?? new Date().toString()}
                  todo={currTodo}
                />
              ))}
            </InfiniteScroll>
          </List>
        </Box>
      )}
      {todos.length === 0 && (
        <Box
          sx={{
            p: 2,
            textAlign: 'center',
          }}
        >
          <div>Nothing todo :&#41;</div>
        </Box>
      )}
    </Box>
  )
}
export default CalendarView

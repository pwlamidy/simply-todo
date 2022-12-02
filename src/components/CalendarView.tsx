import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Box, List } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { FetchTodoParam } from '../../types'
import { useStore } from '../store'
import { fetchTodos } from '../utils/api'
import BasicStaticDatePicker from './BasicStaticDatePicker'
import ToDoItem from './ToDoItem'
import InfiniteScroll from 'react-infinite-scroll-component'
import { PAGE_SIZE } from '../utils/constants'

function CalendarView() {
  const { todos, initTodos, monthlyTodos, initMonthlyTodos } = useStore()
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
    setSearchParams(() => ({ date: d.format('YYYY-MM-DD') }))

    setSelectedDate(d)

    const todosResult = await fetchTodos({
      start: d.startOf('day'),
      end: d.endOf('day'),
    } as FetchTodoParam)

    setTodosTotal(todosResult['page']['total'])

    initTodos(todosResult['data'])
  }

  const handleMonthChange = async (m: Dayjs) => {
    const monthlyTodosResult = await fetchTodos({
      start: m.startOf('month'),
      end: m.endOf('month'),
    } as FetchTodoParam)

    initMonthlyTodos(monthlyTodosResult['data'])
  }

  const isToday = useMemo(
    () => selectedDate.format('DD-MM-YYYY') !== dayjs().format('DD-MM-YYYY'),
    [selectedDate]
  )

  useEffect(() => {
    const getTodos = async () => {
      const currDate = dayjs(
        new URLSearchParams(searchParams).get('date') || Date.now()
      )
      setSelectedDate(currDate)

      const monthlyTodosResult = await fetchTodos({
        start: currDate.startOf('month'),
        end: currDate.endOf('month'),
      } as FetchTodoParam)

      initMonthlyTodos(monthlyTodosResult['data'])

      const todosResult = await fetchTodos({
        start: currDate.startOf('day'),
        end: currDate.endOf('day'),
      } as FetchTodoParam)

      setTodosTotal(todosResult['page']['total'])

      initTodos(todosResult['data'])
    }

    getTodos()
  }, [searchParams, initMonthlyTodos, initTodos])

  return (
    <Box sx={{
      paddingBottom: '60px',
    }}>
      <BasicStaticDatePicker
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        handleDateChange={handleDateChange}
        handleMonthChange={handleMonthChange}
        monthlyTodos={monthlyTodos}
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
                  shouldFocus={
                    currTodo.id === todos[0].id && currTodo.title === ''
                  }
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

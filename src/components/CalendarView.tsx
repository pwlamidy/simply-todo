import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { Box, List } from '@mui/material'
import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Todo } from '../../types'
import { useStore } from '../store'
import { fetchTodos, updateServerTodo } from '../utils/api'
import BasicStaticDatePicker from './BasicStaticDatePicker'
import ToDoItem from './ToDoItem'

function CalendarView() {
  const { todos, initTodos, updateTodo, monthlyTodos, initMonthlyTodos } =
    useStore()
  const [selectedDate, setSelectedDate] = useState(dayjs())
  const [searchParams, setSearchParams] = useSearchParams()

  const handleDateChange = async (d: Dayjs) => {
    setSearchParams(() => ({ date: d.format('YYYY-MM-DD') }))

    setSelectedDate(d)

    const todos = await fetchTodos(d.startOf('day'), d.endOf('day'))

    initTodos(todos)
  }

  const handleMonthChange = async (m: Dayjs) => {
    const monthlyTodos = await fetchTodos(m.startOf('month'), m.endOf('month'))

    initMonthlyTodos(monthlyTodos)
  }

  const isToday = useMemo(
    () => selectedDate.format('DD-MM-YYYY') !== dayjs().format('DD-MM-YYYY'),
    [selectedDate]
  )

  const ontTitleChangeHandler = async (id: string, titleText: string) => {
    const todoInEdit = todos.find((t) => t.id === id)
    const updTodo = {
      ...todoInEdit,
      title: titleText,
    } as Todo
    await updateServerTodo(updTodo)
    updateTodo(updTodo)
  }

  useEffect(() => {
    const getTodos = async () => {
      const currDate = dayjs(new URLSearchParams(searchParams).get('date') || Date.now())
      setSelectedDate(currDate)

      const monthlyTodos = await fetchTodos(
        currDate.startOf('month'),
        currDate.endOf('month')
      )

      initMonthlyTodos(monthlyTodos)

      const todos = await fetchTodos(
        currDate.startOf('day'),
        currDate.endOf('day')
      )

      initTodos(todos)
    }

    getTodos()
  }, [searchParams, initMonthlyTodos, initTodos])

  return (
    <Box>
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
        <List
          sx={{
            paddingBottom: '60px',
            position: 'absolute',
            width: '100%',
            height: '45%',
            overflow: 'auto',
          }}
        >
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

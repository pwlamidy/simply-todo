import { lazy } from 'react'
import { routerType } from '../types/router.types'

const CalendarView = lazy(() => import('../components/CalendarView'))
const EditToDoModal = lazy(() => import('../components/EditToDoModal'))
const ToDoItemList = lazy(() => import('../components/ToDoItemList'))

const pagesData: routerType[] = [
  {
    path: 'list',
    element: <ToDoItemList />,
    title: 'todolist',
  },
  {
    path: 'calendar',
    element: <CalendarView />,
    title: 'calendar',
  },
  {
    path: 'edit/:id',
    element: <EditToDoModal />,
    title: 'edit',
  },
]

export default pagesData

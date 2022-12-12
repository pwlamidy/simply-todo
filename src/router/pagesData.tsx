import { lazy } from 'react'
import { RouterType } from '../types/router.types'

const Login = lazy(() => import('../components/Login'))
const CalendarView = lazy(() => import('../components/CalendarView'))
const EditToDoModal = lazy(() => import('../components/EditToDoModal'))
const ToDoItemList = lazy(() => import('../components/ToDoItemList'))

const pagesData: RouterType[] = [
  {
    path: '/login',
    element: <Login />,
    title: 'login',
    protected: false
  },
  {
    path: '/list',
    element: <ToDoItemList />,
    title: 'list',
    protected: true
  },
  {
    path: 'calendar',
    element: <CalendarView />,
    title: 'calendar',
    protected: true
  },
  {
    path: 'edit/:id',
    element: <EditToDoModal />,
    title: 'edit',
    protected: true
  },
]

export default pagesData

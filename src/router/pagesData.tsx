import { lazy } from 'react'
import SignUp from '../components/SignUp'
import { RouterType } from '../types/router.types'

const Login = lazy(() => import('../components/Login'))
const CalendarView = lazy(() => import('../components/CalendarView'))
const EditToDoModal = lazy(() => import('../components/EditToDoModal'))
const ToDoItemList = lazy(() => import('../components/ToDoItemList'))
const NoAccess = lazy(() => import('../components/AccessControl/NoAccess'))

const pagesData: RouterType[] = [
  {
    path: '/login',
    element: <Login />,
    title: 'login',
    protected: false,
  },
  {
    path: '/signup',
    element: <SignUp />,
    title: 'singup',
    protected: false,
  },
  {
    path: '/list',
    element: <ToDoItemList />,
    title: 'list',
    protected: true,
  },
  {
    path: 'calendar',
    element: <CalendarView />,
    title: 'calendar',
    protected: true,
  },
  {
    path: 'edit/:id',
    element: <EditToDoModal />,
    title: 'edit',
    protected: true,
  },
  {
    path: 'no-access',
    element: <NoAccess />,
    title: 'noaccess',
    protected: false,
  },
]

export default pagesData

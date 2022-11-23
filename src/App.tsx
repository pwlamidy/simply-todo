import { Box, CssBaseline, Paper } from '@mui/material'
import { lazy, Suspense, useMemo } from 'react'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import './App.css'
import LoadingSpinner from './components/LoadingSpinner'
import SelectBottomNavigation from './components/SelectBottomNavigation'
import SimpleBottomNavigation from './components/SimpleBottomNavigation'

const CalendarView = lazy(() => import('./components/CalendarView'))
const EditToDoModal = lazy(() => import('./components/EditToDoModal'))
const ToDoItemList = lazy(() => import('./components/ToDoItemList'))

function App() {
  const [searchParams] = useSearchParams()

  const isSelectMode = useMemo(() => {
    return new URLSearchParams(searchParams).get('mode') === 'select'
  }, [searchParams])

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Paper
        elevation={1}
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          maxHeight: '40px',
          height: '40px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1,
          textTransform: 'uppercase',
        }}
      >
        {isSelectMode ? 'Select Todo' : 'Todo'}
      </Paper>
      <Box
        sx={{
          marginTop: '40px',
        }}
      >
        <Routes>
          <Route
            path="/"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <ToDoItemList />
              </Suspense>
            }
          ></Route>
          <Route
            path="/calendar"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <CalendarView />
              </Suspense>
            }
          ></Route>
          <Route
            path="/edit/:id"
            element={
              <Suspense fallback={<LoadingSpinner />}>
                <EditToDoModal />
              </Suspense>
            }
          ></Route>
        </Routes>
      </Box>
      <Paper
        sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
        elevation={3}
      >
        {!isSelectMode && <SimpleBottomNavigation />}
        {isSelectMode && <SelectBottomNavigation />}
      </Paper>
    </Box>
  )
}

export default App

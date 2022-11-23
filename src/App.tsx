import { Box, CssBaseline, Paper } from '@mui/material'
import { useMemo } from 'react'
import { Route, Routes, useSearchParams } from 'react-router-dom'
import './App.css'
import CalendarView from './components/CalendarView'
import EditToDoModal from './components/EditToDoModal'
import SelectBottomNavigation from './components/SelectBottomNavigation'
import SimpleBottomNavigation from './components/SimpleBottomNavigation'
import ToDoItemList from './components/ToDoItemList'

function App() {
  const [searchParams] = useSearchParams()

  const isSelectMode = useMemo(() => {
    return new URLSearchParams(searchParams).get('mode') === 'select'
  }, [searchParams])

  return (
    <Box sx={{ pb: 7 }}>
      <CssBaseline />
      <Box
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
          backgroundColor: '#f5f5f5',
          zIndex: 1,
          textTransform: 'uppercase'
        }}
      >
        {isSelectMode ? 'Select Todo' : 'Todo'}
      </Box>
      <Box
        sx={{
          marginTop: '40px',
        }}
      >
        <Routes>
          <Route path="/" element={<ToDoItemList />}></Route>
          <Route path="/calendar" element={<CalendarView />}></Route>
          <Route path="/edit/:id" element={<EditToDoModal />}></Route>
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

import { Box, CssBaseline, Paper } from '@mui/material'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import './App.css'
import EditToDoModal from './components/EditToDoModal'
import SimpleBottomNavigation from './components/SimpleBottomNavigation'
import ToDoItemList from './components/ToDoItemList'

function App() {
  return (
    <Router>
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <Routes>
          <Route path="/" element={<ToDoItemList />}></Route>
          <Route path="/calendar" element={<div>test</div>}></Route>
          <Route path="/edit/:id" element={<EditToDoModal />}></Route>
        </Routes>
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <SimpleBottomNavigation />
        </Paper>
      </Box>
    </Router>
  )
}

export default App

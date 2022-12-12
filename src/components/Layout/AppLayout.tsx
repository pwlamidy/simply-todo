import { Box, CssBaseline, Paper } from '@mui/material'
import { useMemo } from 'react'
import { Outlet, useSearchParams } from 'react-router-dom'
import SelectBottomNavigation from '../SelectBottomNavigation'
import SimpleBottomNavigation from '../SimpleBottomNavigation'

function AppLayout() {
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
        <Outlet />
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
export default AppLayout

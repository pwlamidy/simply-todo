import MenuIcon from '@mui/icons-material/Menu'
import { Paper } from '@mui/material'
import { useState } from 'react'
import TemporaryDrawer from '../TemporaryDrawer'

type Props = {
  isSelectMode: boolean
}

function Header({ isSelectMode }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <>
      <TemporaryDrawer
        isDrawerOpen={isDrawerOpen}
        setIsDrawerOpen={setIsDrawerOpen}
      />
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
        <MenuIcon
          onClick={() => {
            setIsDrawerOpen(true)
          }}
          sx={{
            position: 'absolute',
            left: 0,
            m: 1,
          }}
        />
        <div>{isSelectMode ? 'Select Todo' : 'Todo'}</div>
      </Paper>
    </>
  )
}
export default Header

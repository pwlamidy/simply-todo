import LogoutIcon from '@mui/icons-material/Logout'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import {
  Dispatch,
  Fragment,
  KeyboardEvent,
  MouseEvent,
  SetStateAction,
  useCallback,
  useEffect,
} from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'

type Props = {
  isDrawerOpen: boolean
  setIsDrawerOpen: Dispatch<SetStateAction<boolean>>
}

export default function TemporaryDrawer({
  isDrawerOpen,
  setIsDrawerOpen,
}: Props) {
  const navigate = useNavigate()
  const { setAuthData } = useStore()

  const toggleDrawer = useCallback(
    (open: boolean) => (event: KeyboardEvent | MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return
      }

      setIsDrawerOpen(open)
    },
    [setIsDrawerOpen]
  )

  useEffect(() => {
    toggleDrawer(isDrawerOpen)
  }, [isDrawerOpen, toggleDrawer])

  const logout = () => {
    setAuthData('')
    navigate('/login')
  }

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem disablePadding>
          <ListItemButton onClick={logout}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  )

  return (
    <div>
      <Fragment>
        <Drawer open={isDrawerOpen} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </Fragment>
    </div>
  )
}

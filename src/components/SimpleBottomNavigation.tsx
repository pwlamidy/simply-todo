import { CalendarMonth, ListAlt } from '@mui/icons-material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import * as React from 'react'
import {
  Link as RouterLink
} from 'react-router-dom'

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0)

  return (
    <BottomNavigation
      showLabels
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue)
      }}
    >
      <BottomNavigationAction
        label="List"
        icon={<ListAlt />}
        to="/"
        component={RouterLink}
      />
      <BottomNavigationAction
        label="Calendar"
        icon={<CalendarMonth />}
        to="/calendar"
        component={RouterLink}
      />
    </BottomNavigation>
  )
}

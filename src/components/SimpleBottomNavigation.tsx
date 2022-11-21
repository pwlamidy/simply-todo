import { CalendarMonth, ListAlt } from '@mui/icons-material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import * as React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'

enum RouteMapping {
  ROOT = '/',
  CALENDAR = '/calendar',
}

export default function SimpleBottomNavigation() {
  const [value, setValue] = React.useState(0)
  const { pathname } = useLocation()

  React.useEffect(() => {
    let navVal = 0
    switch (pathname) {
      case RouteMapping.ROOT:
        navVal = 0
        break
      case RouteMapping.CALENDAR:
        navVal = 1
    }
    setValue(navVal)
  }, [pathname])

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
        to={RouteMapping.ROOT}
        component={RouterLink}
      />
      <BottomNavigationAction
        label="Calendar"
        icon={<CalendarMonth />}
        to={RouteMapping.CALENDAR}
        component={RouterLink}
      />
    </BottomNavigation>
  )
}

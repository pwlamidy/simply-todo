import { Delete as DeleteIcon, Done as DoneIcon } from '@mui/icons-material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useSearchParams } from 'react-router-dom'
import { useStore } from '../store'
import { deleteServerTodos, toggleServerTodos } from '../utils/api'

function SelectBottomNavigation() {
  const { selected, initTodos, todos, toggleComplete } = useStore()
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        onClick={async () => {
          await deleteServerTodos(selected)
          initTodos(todos.filter(t => selected.indexOf(t.id) === -1))
          setSearchParams({})
        }}
        label="Delete"
        icon={<DeleteIcon />}
      />
      <BottomNavigationAction
        onClick={async () => {
          await toggleServerTodos(selected)
          selected.forEach(s => toggleComplete(s))
          setSearchParams({})
        }}
        label="Complete"
        icon={<DoneIcon />}
      />
    </BottomNavigation>
  )
}
export default SelectBottomNavigation

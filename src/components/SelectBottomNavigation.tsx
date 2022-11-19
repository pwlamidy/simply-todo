import { Delete as DeleteIcon, Done as DoneIcon } from '@mui/icons-material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { useStore } from '../app/store'
import { deleteServerTodos, toggleServerTodos } from '../utils/api'

function SelectBottomNavigation() {
  const { selected, toggleSelectMode } = useStore()

  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        onClick={async () => {
          await deleteServerTodos(selected)
          toggleSelectMode()
        }}
        label="Delete"
        icon={<DeleteIcon />}
      />
      <BottomNavigationAction
        onClick={async () => {
          await toggleServerTodos(selected)
          toggleSelectMode()
        }}
        label="Complete"
        icon={<DoneIcon />}
      />
    </BottomNavigation>
  )
}
export default SelectBottomNavigation

import { Delete as DeleteIcon, Done as DoneIcon } from '@mui/icons-material'
import BottomNavigation from '@mui/material/BottomNavigation'
import BottomNavigationAction from '@mui/material/BottomNavigationAction'
import { doc, writeBatch } from 'firebase/firestore'
import { useSearchParams } from 'react-router-dom'
import { db } from '../firebase'
import { useStore } from '../store'

function SelectBottomNavigation() {
  const { selected, initTodos, todos, toggleComplete } = useStore()
  // eslint-disable-next-line
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <BottomNavigation showLabels>
      <BottomNavigationAction
        onClick={async () => {
          const batch = writeBatch(db)
          selected.forEach((id) => {
            batch.delete(doc(db, 'todos', id))
          })
          await batch.commit()

          initTodos(todos.filter((t) => selected.indexOf(t.id) === -1))
          setSearchParams({})
        }}
        label="Delete"
        icon={<DeleteIcon />}
      />
      <BottomNavigationAction
        onClick={async () => {
          const batch = writeBatch(db)
          selected.forEach((id) => {
            const currTodo = todos.find((t) => t.id === id)
            batch.update(doc(db, 'todos', id), {
              completed: !currTodo?.completed,
            })
          })
          await batch.commit()
          
          selected.forEach((s) => toggleComplete(s))
          setSearchParams({})
        }}
        label="Complete"
        icon={<DoneIcon />}
      />
    </BottomNavigation>
  )
}
export default SelectBottomNavigation

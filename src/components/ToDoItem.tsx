import {
  CheckCircle as CheckCircleIcon,
  More as MoreIcon,
} from '@mui/icons-material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { IconButton, Input, ListItem, ListItemIcon } from '@mui/material'
import { useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Todo } from '../../types'
import { useStore } from '../app/store'
import { toggleServerTodo } from '../utils/api'

function ToDoItem({ id, title, ontTitleChangeHandler }: any) {
  const { todos, toggleComplete, isSelectMode, addSelected, selected } =
    useStore()
  const [currTodo, setCurrTodo] = useState<Todo>()

  useEffect(() => {
    setCurrTodo(todos.find((t) => t.id === id))
  }, [todos, id])

  return (
    <ListItem
      secondaryAction={
        !isSelectMode && (
          <IconButton
            edge="end"
            aria-label="more"
            to={`/edit/${id}`}
            component={RouterLink}
          >
            <MoreIcon />
          </IconButton>
        )
      }
    >
      {!isSelectMode && (
        <ListItemIcon
          onClick={async () => {
            await toggleServerTodo(id)
            toggleComplete(id)
          }}
        >
          {currTodo?.completed ? (
            <RadioButtonCheckedIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </ListItemIcon>
      )}
      {isSelectMode && (
        <ListItemIcon onClick={() => addSelected(id)}>
          {currTodo?.id && selected.indexOf(currTodo?.id) > -1 ? (
            <CheckCircleIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </ListItemIcon>
      )}
      <Input
        value={title}
        onChange={(e) => ontTitleChangeHandler(e.target.value)}
        fullWidth={true}
      />
    </ListItem>
  )
}
export default ToDoItem

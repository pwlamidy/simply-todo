import { More as MoreIcon } from '@mui/icons-material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import {
  IconButton,
  Input,
  ListItem, ListItemIcon
} from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { Todo } from '../../types'
import { ToDoContext } from '../contexts/ToDo.context'
import { TodoActionKind } from '../reducers/todoReducer'

function ToDoItem({ id, title, ontTitleChangeHandler }: any) {
  const { todoState, todoDispatch } = useContext(ToDoContext)
  const [currTodo, setCurrTodo] = useState<Todo>()

  useEffect(() => {
    setCurrTodo(todoState.todos.find((t) => t.id === id))
  }, [todoState.todos, id])

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="more"
          to={`/edit/${id}`}
          component={RouterLink}
        >
          <MoreIcon />
        </IconButton>
      }
    >
      <ListItemIcon
        onClick={() => {
          todoDispatch({
            type: TodoActionKind.TOGGLE_COMPLETE,
            payload: { id },
          })
        }}
      >
        {currTodo?.completed ? (
          <RadioButtonCheckedIcon />
        ) : (
          <RadioButtonUncheckedIcon />
        )}
      </ListItemIcon>
      <Input
        value={title}
        onChange={(e) => ontTitleChangeHandler(e.target.value)}
        fullWidth={true}
      />
    </ListItem>
  )
}
export default ToDoItem

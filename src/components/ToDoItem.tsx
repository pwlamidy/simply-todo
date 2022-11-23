import {
  CheckCircle as CheckCircleIcon,
  More as MoreIcon
} from '@mui/icons-material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { IconButton, Input, ListItem, ListItemIcon } from '@mui/material'
import { useEffect, useMemo, useState } from 'react'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { Todo } from '../../types'
import { useStore } from '../store'
import { toggleServerTodo } from '../utils/api'

type Props = {
  id: string
  title: string
  ontTitleChangeHandler: Function
}

function ToDoItem({ id, title, ontTitleChangeHandler }: Props) {
  const { todos, toggleComplete, toggleSelected, selected } = useStore()
  const [currTodo, setCurrTodo] = useState<Todo>()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    setCurrTodo(todos.find((t) => t.id === id))
  }, [todos, id])

  const isSelectMode = useMemo(() => {
    return new URLSearchParams(searchParams).get('mode') === 'select'
  }, [searchParams])

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
        <ListItemIcon onClick={() => toggleSelected(id)}>
          {currTodo?.id && selected.indexOf(currTodo?.id) > -1 ? (
            <CheckCircleIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </ListItemIcon>
      )}
      <Input
        inputRef={input => input && currTodo?.id === todos[0].id && currTodo?.title === '' && input.focus()}
        placeholder="(Please input title)"
        disabled={isSelectMode}
        value={title}
        onChange={(e) => ontTitleChangeHandler(e.target.value)}
        fullWidth={true}
      />
    </ListItem>
  )
}
export default ToDoItem

import {
  CheckCircle as CheckCircleIcon,
  More as MoreIcon,
} from '@mui/icons-material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { IconButton, Input, ListItem, ListItemIcon } from '@mui/material'
import { useMemo } from 'react'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { Todo } from '../../types'
import { useStore } from '../store'
import { addServerTodo, toggleServerTodo, updateServerTodo } from '../utils/api'

type Props = {
  todo: Todo
  shouldFocus?: boolean
}

function ToDoItem({ todo, shouldFocus }: Props) {
  const { updateTodo, toggleComplete, toggleSelected, selected } = useStore()
  const [searchParams] = useSearchParams()

  const isSelectMode = useMemo(() => {
    return new URLSearchParams(searchParams).get('mode') === 'select'
  }, [searchParams])

  const onTitleChangeHandler = async (titleText: string) => {
    // Create server todo if new todo
    if (!todo.id) {
      const todo = await addServerTodo({ title: titleText } as Todo)
      updateTodo(todo)
    } else {
      const updTodo = {
        ...todo,
        title: titleText,
      } as Todo
      await updateServerTodo(updTodo)
      updateTodo(updTodo)
    }
  }

  return (
    <ListItem
      secondaryAction={
        !isSelectMode && (
          <IconButton
            edge="end"
            aria-label="more"
            to={`/edit/${todo.id}`}
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
            await toggleServerTodo(todo.id)
            toggleComplete(todo.id)
          }}
        >
          {todo?.completed ? (
            <RadioButtonCheckedIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </ListItemIcon>
      )}
      {isSelectMode && (
        <ListItemIcon onClick={() => toggleSelected(todo.id)}>
          {todo.id && selected.indexOf(todo?.id) > -1 ? (
            <CheckCircleIcon />
          ) : (
            <RadioButtonUncheckedIcon />
          )}
        </ListItemIcon>
      )}
      <Input
        inputRef={(input) => input && shouldFocus && input.focus()}
        placeholder="(Please input title)"
        disabled={isSelectMode}
        value={todo.title}
        onChange={(e) => onTitleChangeHandler(e.target.value)}
        fullWidth={true}
      />
    </ListItem>
  )
}
export default ToDoItem

import {
  CheckCircle as CheckCircleIcon,
  More as MoreIcon,
} from '@mui/icons-material'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'
import { IconButton, Input, ListItem, ListItemIcon } from '@mui/material'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link as RouterLink, useSearchParams } from 'react-router-dom'
import { Todo } from '../../types'
import { useDebounce } from '../hooks/useDebounce'
import { useStore } from '../store'
import { addServerTodo, toggleServerTodo, updateServerTodo } from '../utils/api'

type Props = {
  todo: Todo
  shouldFocus?: boolean
}

function ToDoItem({ todo, shouldFocus }: Props) {
  const { updateTodo, toggleComplete, toggleSelected, selected } = useStore()
  const [searchParams] = useSearchParams()
  const [input, setInput] = useState<string>(todo.title)
  const debounceInput = useDebounce(input)
  const [initialized, setInitialized] = useState(false)
  const queue = useRef<Promise<any>>(Promise.resolve(true))

  const addToQueue = (operation: Promise<any>) => {
    return new Promise((resolve, reject) => {
      queue.current = queue.current
        .then(() => operation)
        .then((newTodo) => updateTodo(newTodo))
        .then(resolve)
        .catch(reject)
    })
  }

  const isSelectMode = useMemo(() => {
    return new URLSearchParams(searchParams).get('mode') === 'select'
  }, [searchParams])

  const onTitleChangeHandler = async (titleText: string) => {
    setInput(titleText)
  }

  useEffect(() => {
    if (!initialized) {
      setInitialized(true)
    } else {
      // async action with debounceInput
      const handleTitleChange = async (titleText?: string) => {
        // Create server todo if new todo
        if (!todo.id) {
          addToQueue(addServerTodo({ title: titleText } as Todo))
        } else {
          const updTodo = {
            ...todo,
            title: titleText,
          } as Todo
          addToQueue(updateServerTodo(updTodo))
        }
      }

      handleTitleChange(debounceInput)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceInput])

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
        value={input}
        onChange={(e) => onTitleChangeHandler(e.target.value)}
        fullWidth={true}
      />
    </ListItem>
  )
}
export default ToDoItem

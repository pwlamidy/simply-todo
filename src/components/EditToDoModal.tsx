import CloseIcon from '@mui/icons-material/Close'
import { Grid, Switch, TextField } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Slide from '@mui/material/Slide'
import Toolbar from '@mui/material/Toolbar'
import { TransitionProps } from '@mui/material/transitions'
import Typography from '@mui/material/Typography'
import dayjs, { Dayjs } from 'dayjs'
import { forwardRef, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Todo } from '../../types'
import { useStore } from '../store'
import {
  addServerTodo,
  deleteServerTodo,
  fetchTodo,
  updateServerTodo,
} from '../utils/api/todo'
import AlertDialog from './Alert/AlertDialog'
import BasicDatePicker from './BasicDatePicker'
import BasicTimePicker from './BasicTimePicker'

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />
})

function EditToDoModal() {
  const [openAlert, setOpenAlert] = useState(false)
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { id } = useParams()
  const { deleteTodo } = useStore()
  const [currTodo, setCurrTodo] = useState<Todo>({} as Todo)
  const [dateVal, setDateVal] = useState<Dayjs | null>(null)
  const [timeVal, setTimeVal] = useState<Dayjs | null>(null)

  useEffect(() => {
    const getTodo = async () => {
      const todo = await fetchTodo(`${id}`)
      setCurrTodo(todo)
    }

    if (id && id !== 'undefined') {
      getTodo()
    }
  }, [id])

  useEffect(() => {
    const newDate = currTodo?.date ? dayjs(currTodo?.date) : null
    setDateVal(newDate)
  }, [currTodo?.date])

  useEffect(() => {
    const newTime = currTodo?.time ? dayjs(currTodo?.time) : null
    setTimeVal(newTime)
  }, [currTodo?.time])

  const handleTitleChange = (title: string) => {
    setCurrTodo(
      (t) =>
        ({
          ...t,
          title,
        } as Todo)
    )
  }

  const handleDetailsChange = (details: string) => {
    setCurrTodo(
      (t) =>
        ({
          ...t,
          details,
        } as Todo)
    )
  }

  const handleDateChange = (val: Date | null) => {
    setCurrTodo(
      (t) =>
        ({
          ...t,
          date: val,
        } as Todo)
    )
  }

  const handleTimeChange = (val: Date | null) => {
    setCurrTodo(
      (t) =>
        ({
          ...t,
          time: val,
        } as Todo)
    )
  }

  const handleLocationChange = (location: string) => {
    setCurrTodo(
      (t) =>
        ({
          ...t,
          location,
        } as Todo)
    )
  }

  const handleClickOpen = () => {
    setOpenAlert(true)
  }

  const handleClose = () => {
    setOpenAlert(false)
  }

  const handleDeleteConfirm = async () => {
    if (id && id !== 'undefined') {
      await deleteServerTodo(id)
      deleteTodo(id)
    }
    handleClose()
    navigate(-1)
  }

  return (
    <div>
      <Dialog
        fullScreen
        open={pathname.indexOf('/edit') > -1}
        onClose={() => navigate(-1)}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => navigate(-1)}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Edit
            </Typography>
            <Button
              autoFocus
              color="inherit"
              onClick={async () => {
                let defaultTodo = currTodo

                // Force non null title
                if (!currTodo.title) {
                  defaultTodo = Object.assign({}, currTodo, {
                    title: 'New Todo',
                  })
                }

                if (!currTodo?.id) {
                  // New todo
                  await addServerTodo(defaultTodo)
                } else {
                  await updateServerTodo(defaultTodo)
                }
                navigate(-1)
              }}
            >
              save
            </Button>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem>
            <TextField
              label="Title"
              fullWidth
              value={currTodo?.title || ''}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="New Todo"
            />
          </ListItem>
          <ListItem>
            <TextField
              multiline
              fullWidth
              placeholder="Details"
              minRows={2}
              value={currTodo?.details || ''}
              onChange={(e) => handleDetailsChange(e.target.value)}
            />
          </ListItem>
          <Grid container>
            <Grid xs={10} item>
              {currTodo?.date && (
                <ListItem>
                  <BasicDatePicker
                    handleDateChange={handleDateChange}
                    value={dateVal}
                  />
                </ListItem>
              )}
              {!currTodo?.date && (
                <ListItem>
                  <BasicDatePicker
                    handleDateChange={handleDateChange}
                    value={null}
                  />
                </ListItem>
              )}
            </Grid>
            <Grid alignItems="center" display="flex" item>
              <Switch
                checked={
                  currTodo?.date !== null && currTodo?.date !== undefined
                }
                onChange={(e) => {
                  setCurrTodo(
                    (t) =>
                      ({
                        ...t,
                        date: e.target.checked ? dayjs() : undefined,
                      } as Todo)
                  )
                }}
              />
            </Grid>
          </Grid>
          <Grid container>
            <Grid xs={10} item>
              {currTodo?.time && (
                <ListItem>
                  <BasicTimePicker
                    handleTimeChange={handleTimeChange}
                    value={timeVal}
                  />
                </ListItem>
              )}
              {!currTodo?.time && (
                <ListItem>
                  <BasicTimePicker
                    handleTimeChange={handleTimeChange}
                    value={null}
                  />
                </ListItem>
              )}
            </Grid>
            <Grid xs alignItems="center" display="flex" item>
              <Switch
                checked={
                  currTodo?.time !== null && currTodo?.time !== undefined
                }
                onChange={(e) => {
                  setCurrTodo(
                    (t) =>
                      ({
                        ...t,
                        time: e.target.checked ? dayjs() : undefined,
                      } as Todo)
                  )
                }}
              />
            </Grid>
          </Grid>
          <ListItem>
            <TextField
              label="Location"
              fullWidth
              value={currTodo?.location || ''}
              onChange={(e) => handleLocationChange(e.target.value)}
            />
          </ListItem>
          <ListItem>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="error"
              fullWidth
            >
              Delete
            </Button>
          </ListItem>
        </List>
      </Dialog>
      <AlertDialog
        handleClose={handleClose}
        open={openAlert}
        handleConfirm={handleDeleteConfirm}
      />
    </div>
  )
}
export default EditToDoModal

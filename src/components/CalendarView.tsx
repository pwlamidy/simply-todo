import { Box, List, Typography } from '@mui/material'
import { Dayjs } from 'dayjs'
import { useStore } from '../store'
import BasicStaticDatePicker from './BasicStaticDatePicker'
import ToDoItem from './ToDoItem'

function CalendarView() {
  const { todos } = useStore()

  const handleDateChange = (d: Dayjs) => {
    console.log(d.format('DD/MM/YYYY'))
  }

  return (
    <Box>
      <BasicStaticDatePicker handleDateChange={handleDateChange} />

      <List sx={{ marginBottom: '60px' }}>
        {todos.map(({ id, title }, index) => (
          <Typography
            key={index}
            sx={{ mt: 4, mb: 2 }}
            variant="h6"
            component="div"
          >
            {title}
          </Typography>
        ))}
      </List>
    </Box>
  )
}
export default CalendarView

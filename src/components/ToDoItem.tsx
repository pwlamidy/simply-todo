import { IconButton, Input, ListItem } from '@mui/material'
import { More } from '@mui/icons-material'
import { Link as RouterLink } from 'react-router-dom'

function ToDoItem({ id, title, ontTitleChangeHandler }: any) {
  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="more"
          to={`/edit/${id}`}
          component={RouterLink}
        >
          <More />
        </IconButton>
      }
    >
      <Input
        value={title}
        onChange={(e) => ontTitleChangeHandler(e.target.value)}
        fullWidth={true}
      />
    </ListItem>
  )
}
export default ToDoItem

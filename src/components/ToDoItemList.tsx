import { AddBox } from '@mui/icons-material'
import { Button, List } from '@mui/material'
import { useEffect, useState } from 'react'
import EditToDoModal from './EditToDoModal'
import ToDoItem from './ToDoItem'

function ToDoItemList() {
  const [toDoItems, setToDoItems] = useState<any[]>([])

  useEffect(() => {
    setToDoItems(
      [...Array(10)].map((_, i) => {
        return {
          id: `${i}`,
          title: 'test',
        }
      })
    )
  }, [])

  const addToDoHandler = () => {
    setToDoItems((currItems) => [
      {
        id: Math.random().toString(),
        title: '',
      },
      ...currItems,
    ])
  }

  const ontTitleChangeHandler = (id: string, titleText: string) => {
    setToDoItems((currItems) =>
      currItems.map((item) => {
        if (item.id === id) {
          return { ...item, title: titleText }
        } else {
          return item
        }
      })
    )
  }
  return (
    <>
      <List>
        {toDoItems.map(({ id, title }, index) => (
          <ToDoItem
            key={index}
            id={id}
            title={title}
            ontTitleChangeHandler={(titleText: string) =>
              ontTitleChangeHandler(id, titleText)
            }
          />
        ))}
      </List>
      <EditToDoModal />
      <Button variant="text" onClick={addToDoHandler}>
        <AddBox />
        Add
      </Button>
    </>
  )
}
export default ToDoItemList

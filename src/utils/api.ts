import { Todo } from '../../types'

export const fetchTodos = async () => {
  const res = await fetch('http://127.0.0.1:5000/todos')
  const data = await res.json()

  return data
}

export const fetchTodo = async (id: string) => {
  const res = await fetch(`http://127.0.0.1:5000/todos/${id}`)
  const data = await res.json()

  return data
}

export const addServerTodo = async (todo: Todo) => {
  const res = await fetch('http://127.0.0.1:5000/todos', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  const data = await res.json()

  return data
}

export const updateServerTodo = async (todo: Todo) => {
  const res = await fetch(`http://127.0.0.1:5000/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  const data = await res.json()

  return data
}

export const deleteServerTodo = async (id: string) => {
  await fetch(`http://127.0.0.1:5000/todos/${id}`, {
    method: 'DELETE',
  })
}

export const toggleServerTodo = async (id: string) => {
  const todoToToggle = await fetchTodo(id)
  const updTodo = { ...todoToToggle, completed: !todoToToggle.completed }

  const res = await fetch(`http://127.0.0.1:5000/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTodo),
  })

  const data = await res.json()

  return data
}

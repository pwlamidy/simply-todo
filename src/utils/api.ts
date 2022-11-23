import { Dayjs } from 'dayjs'
import { Todo } from '../../types'

export const fetchTodos = async (start?: Dayjs, end?: Dayjs) => {
  const queryParams = [
    {
      createdAt_gte: start ? start.toISOString() : '',
    },
    {
      createdAt_lte: end ? end.toISOString() : '',
    },
    {
      _sort: 'id',
    },
    {
      _order: 'desc',
    },
  ]
    .filter((p) => Object.values(p)[0])
    .map((v) => `${Object.keys(v)[0]}=${Object.values(v)[0]}`)
    .join('&')

  const res = await fetch(
    'http://192.168.1.133:5000/todos' +
      (queryParams.length > 0 ? `?${queryParams}` : '')
  )
  const data = await res.json()

  return data
}

const fetchTodosByIds = async (ids: string[]) => {
  const res = await fetch(
    `http://192.168.1.133:5000/todos?id=${ids.join('&id=')}`
  )
  const data = await res.json()

  return data
}

export const fetchTodo = async (id: string) => {
  const res = await fetch(`http://192.168.1.133:5000/todos/${id}`)
  const data = await res.json()

  return data
}

export const addServerTodo = async (todo: Todo) => {
  const res = await fetch('http://192.168.1.133:5000/todos', {
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
  const res = await fetch(`http://192.168.1.133:5000/todos/${todo.id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  const data = await res.json()

  return data
}

export const deleteServerTodos = async (ids: Array<string>) => {
  await fetch(`http://192.168.1.133:5000/todos?id=${ids.join('&id=')}`, {
    method: 'DELETE',
  })
}

export const deleteServerTodo = async (id: string) => {
  await fetch(`http://192.168.1.133:5000/todos/${id}`, {
    method: 'DELETE',
  })
}

export const toggleServerTodo = async (id: string) => {
  const todoToToggle = await fetchTodo(id)
  const updTodo = { ...todoToToggle, completed: !todoToToggle.completed }

  const res = await fetch(`http://192.168.1.133:5000/todos/${id}`, {
    method: 'PUT',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTodo),
  })

  const data = await res.json()

  return data
}

export const toggleServerTodos = async (ids: string[]) => {
  console.log('toggle multiple todo as completed', ids)

  const todosToToggle = (await fetchTodosByIds(ids)) as Todo[]
  const updTodos = [] as Todo[]
  todosToToggle.forEach((t) => {
    updTodos.push({ ...t, completed: true })
  })

  const res = await fetch(
    `http://192.168.1.133:5000/todos?id=${ids.join('&id=')}`,
    {
      method: 'PATCH',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todosToToggle),
    }
  )

  const data = await res.json()

  return data
}

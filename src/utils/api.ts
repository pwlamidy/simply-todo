import { FetchTodoParam, Todo } from '../../types'

export const fetchTodos = async (
  {
    start,
    end,
    sort = 'id',
    order = 'desc',
  }: FetchTodoParam = {} as FetchTodoParam
) => {
  const queryParams = [
    {
      date_gte: start ? start.toISOString() : '',
    },
    {
      date_lte: end ? end.toISOString() : '',
    },
    { sort },
    { order },
  ]
    .filter((p) => Object.values(p)[0])
    .map((v) => `${Object.keys(v)[0]}=${Object.values(v)[0]}`)
    .join('&')

  const res = await fetch(
    `${process.env.REACT_APP_TODO_API_ENDPOINT}` +
      (queryParams.length > 0 ? `?${queryParams}` : '')
  )
  const data = await res.json()

  return data['data']
}

export const fetchTodo = async (id: string) => {
  const res = await fetch(`${process.env.REACT_APP_TODO_API_ENDPOINT}/${id}`)
  const data = await res.json()

  return data['data']
}

export const addServerTodo = async (todo: Todo) => {
  const res = await fetch(`${process.env.REACT_APP_TODO_API_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(todo),
  })

  const data = await res.json()

  return data['data']
}

export const updateServerTodo = async (todo: Todo) => {
  const res = await fetch(
    `${process.env.REACT_APP_TODO_API_ENDPOINT}/${todo.id}`,
    {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(todo),
    }
  )

  const data = await res.json()

  return data['data']
}

export const deleteServerTodos = async (ids: Array<string>) => {
  await fetch(`${process.env.REACT_APP_BATCH_TODO_API_ENDPOINT}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(
      ids.map((id) => {
        return {
          id,
        }
      })
    ),
  })
}

export const deleteServerTodo = async (id: string) => {
  await fetch(`${process.env.REACT_APP_TODO_API_ENDPOINT}/${id}`, {
    method: 'DELETE',
  })
}

export const toggleServerTodo = async (id: string) => {
  const todoToToggle = await fetchTodo(id)
  const updTodo = { ...todoToToggle, completed: !todoToToggle.completed }

  const res = await fetch(`${process.env.REACT_APP_TODO_API_ENDPOINT}/${id}`, {
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

  const updTodos = [] as Todo[]
  ids.forEach((id) => {
    updTodos.push({ id, completed: true } as Todo)
  })

  const res = await fetch(`${process.env.REACT_APP_BATCH_TODO_API_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(updTodos),
  })

  const data = await res.json()

  return data['data']
}

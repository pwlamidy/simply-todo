import { Dayjs } from 'dayjs'
import { api } from './api'
import { FetchTodoParam, Todo } from '../../../types'
import { PAGE_SIZE } from '../constants'

export const fetchTodos: any = async (
  {
    start,
    end,
    page = 1,
    size = PAGE_SIZE,
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
    { page },
    { size },
    { sort },
    { order },
  ]
    .filter((p) => Object.values(p)[0])
    .map((v) => `${Object.keys(v)[0]}=${Object.values(v)[0]}`)
    .join('&')

  const res = await api.get(
    `${process.env.REACT_APP_TODO_API_ENDPOINT}` +
      (queryParams.length > 0 ? `?${queryParams}` : '')
  )
  const data = await res.json()

  return data
}

export const fetchTodo: any = async (id: string) => {
  const res = await api.get(`${process.env.REACT_APP_TODO_API_ENDPOINT}/${id}`)
  const data: any = await res.json()

  return data['data']
}

export const addServerTodo = async (todo: Todo) => {
  const res = await api.post(`${process.env.REACT_APP_TODO_API_ENDPOINT}`, {
    json: todo,
  })

  const data: any = await res.json()

  return data['data']
}

export const updateServerTodo = async (todo: Todo) => {
  const res = await api.put(
    `${process.env.REACT_APP_TODO_API_ENDPOINT}/${todo.id}`,
    {
      json: todo,
    }
  )

  const data: any = await res.json()

  return data['data']
}

export const deleteServerTodos = async (ids: Array<string>) => {
  await api.delete(`${process.env.REACT_APP_BATCH_TODO_API_ENDPOINT}`, {
    json: ids.map((id) => {
      return {
        id,
      }
    }),
  })
}

export const deleteServerTodo = async (id: string) => {
  await api.delete(`${process.env.REACT_APP_TODO_API_ENDPOINT}/${id}`)
}

export const toggleServerTodo = async (id: string) => {
  const todoToToggle = await fetchTodo(id)
  const updTodo = { ...todoToToggle, completed: !todoToToggle.completed }

  const res = await api.put(
    `${process.env.REACT_APP_TODO_API_ENDPOINT}/${id}`,
    {
      json: updTodo,
    }
  )

  const data = await res.json()

  return data
}

export const toggleServerTodos = async (ids: string[]) => {
  const updTodos = [] as Todo[]
  ids.forEach((id) => {
    updTodos.push({ id, completed: true } as Todo)
  })

  const res = await api.post(
    `${process.env.REACT_APP_BATCH_TODO_API_ENDPOINT}`,
    {
      json: updTodos,
    }
  )

  const data: any = await res.json()

  return data['data']
}

export const fetchTodosCount = async (start: Dayjs, end: Dayjs) => {
  const queryParams = [
    {
      date_gte: start ? start.toISOString() : '',
    },
    {
      date_lte: end ? end.toISOString() : '',
    },
  ]
    .filter((p) => Object.values(p)[0])
    .map((v) => `${Object.keys(v)[0]}=${Object.values(v)[0]}`)
    .join('&')

  const res = await api.get(
    `${process.env.REACT_APP_TODO_COUNT_API_ENDPOINT}?${queryParams}`
  )

  const data: any = await res.json()

  return data['data']
}

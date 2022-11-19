import { Todo } from '../../types'

export const fetchTodos = async () => {
  const res = await fetch('http://192.168.1.133:5000/todos')
  const data = await res.json()

  return data
}

export const fetchTodosByIds = async (ids: string[]) => {
  const res = await fetch(`http://192.168.1.133:5000/todos?id=${ids.join(',')}`)
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
    body: JSON.stringify({
      ...todo,
      createdAt: new Date(),
      lastUpdatedAt: new Date(),
    }),
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
    body: JSON.stringify({ ...todo, lastUpdatedAt: new Date() }),
  })

  const data = await res.json()

  return data
}

export const deleteServerTodos = async (ids: Array<string>) => {
  console.log('delete multiple', ids)
  // await fetch(`http://192.168.1.133:5000/todos?id=${ids.join(',')}`, {
  //   method: 'DELETE',
  // })
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

  // const todosToToggle = await fetchTodosByIds(ids) as Todo[]
  // const updTodos = [] as Todo[]
  // todosToToggle.forEach(t => {
  //   updTodos.push({ ...t, completed: true })
  // });

  // const res = await fetch(`http://192.168.1.133:5000/todos?id=${ids.join(',')}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-type': 'application/json',
  //   },
  //   body: JSON.stringify(updTodos),
  // })

  // const data = await res.json()

  // return data
}

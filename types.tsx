declare global {}

export interface Todo {
  id: string
  title: string,
  details?: string,
  date?: Date,
  time?: Date,
  needDate: boolean,
  needTime: boolean,
  location?: string,
  completed?: boolean
}
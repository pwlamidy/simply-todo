import { Dayjs } from "dayjs"

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
  completed?: boolean,
  createdAt: Date,
  lastUpdatedAt: Date
}

export interface FetchTodoParam {
  start?: Dayjs
  end?: Dayjs
  page: number
  size: number
  sort: string
  order: string
}

export interface TodosCount {
  date: Date,
  total: number
}
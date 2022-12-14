import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay'
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker'
import dayjs, { Dayjs } from 'dayjs'
import * as React from 'react'
import { TodosCount } from '../../types'

type Props = {
  selectedDate: Dayjs | null
  setSelectedDate: Function
  handleDateChange: Function
  handleMonthChange: Function
  todosCount: TodosCount[]
}

export default function BasicStaticDatePicker({
  selectedDate,
  setSelectedDate,
  handleDateChange,
  handleMonthChange,
  todosCount,
}: Props) {
  const daysWithTodos = React.useMemo(() => todosCount.map(t => dayjs(t.date).date()), [todosCount])

  const renderPickersDay = (
    day: Dayjs,
    selectedDays: Array<Dayjs | null>,
    pickersDayProps: PickersDayProps<Dayjs>
  ) => {
    return (
      <PickersDay
        {...pickersDayProps}
        sx={{
          border:
            daysWithTodos.indexOf(day.date()) > -1
              ? '5px solid green'
              : 'inherit',
          color: daysWithTodos.indexOf(day.date()) > -1 ? 'green' : 'inherit',
        }}
      />
    )
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDatePicker
        displayStaticWrapperAs="desktop"
        renderDay={renderPickersDay}
        value={selectedDate}
        openTo="day"
        onChange={(newValue) => {
          handleDateChange(newValue)
          setSelectedDate(newValue)
        }}
        onMonthChange={(newMonth) => {
          handleMonthChange(newMonth)
        }}
        onYearChange={(newMonth) => {
          handleMonthChange(newMonth)
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </LocalizationProvider>
  )
}

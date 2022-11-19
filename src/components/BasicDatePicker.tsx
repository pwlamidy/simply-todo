import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { Dayjs } from 'dayjs'

type Props = {
  handleDateChange: Function
  value?: Dayjs | null
}

export default function BasicDatePicker({ handleDateChange, value }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        disabled={value === null || value === undefined}
        label="Date"
        inputFormat="DD/MM/YYYY"
        value={value}
        onChange={(newValue: any) => {
          handleDateChange(newValue)
        }}
        renderInput={(params: any) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  )
}

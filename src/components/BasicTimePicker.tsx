import TextField from '@mui/material/TextField'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker } from '@mui/x-date-pickers/TimePicker'
import { Dayjs } from 'dayjs'

type Props = {
  handleTimeChange: Function
  value?: Dayjs | null
}

export default function BasicTimePicker({ handleTimeChange, value }: Props) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker
        disabled={value === null || value === undefined}
        label={value === null || value === undefined ? "Time not enabled" : "Time"}
        value={value}
        onChange={(newValue) => {
          handleTimeChange(newValue)
        }}
        renderInput={(params) => <TextField {...params} fullWidth />}
      />
    </LocalizationProvider>
  )
}

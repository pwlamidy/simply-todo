import { CircularProgress } from "@mui/material"

function LoadingSpinner() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
      }}
    >
      <CircularProgress />
    </div>
  )
}
export default LoadingSpinner
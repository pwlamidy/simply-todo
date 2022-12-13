import { Box, Typography } from '@mui/material'

function NoAccess(): JSX.Element {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography sx={{ m: 1, color: 'orange' }} variant="h4" component="div">
        Access not allowed
      </Typography>
      <Typography sx={{ m: 1 }} variant="h5" component="div">
        Oops!
      </Typography>
      <div>{'Σ(;Φ ω Φ)'}</div>
    </Box>
  )
}
export default NoAccess

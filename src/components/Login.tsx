import { Alert, AlertTitle, Button, Grid, Link, TextField } from '@mui/material'
import SimplyTodoLogo from '../styles/images/simplytodo.png'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import { signInByUsername } from '../utils/api/auth'

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {'Created by Idy Lam '}
    </Typography>
  )
}

const theme = createTheme()

function Login() {
  const navigate = useNavigate()
  const [showLoginError, setShowLoginError] = useState(false)
  const { loading, toggleLoading } = useStore()

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    toggleLoading()

    const res = await signInByUsername(
      event.currentTarget.username.value,
      event.currentTarget.password.value
    )

    toggleLoading()

    if (res.status === 401) {
      setShowLoginError(true)
    } else {
      localStorage.setItem("SIMPLY_TODO_ACCESS_TOKEN", res.data.accessToken)
      localStorage.setItem("SIMPLY_TODO_REFRESH_TOKEN", res.data.refreshToken)
      setShowLoginError(false)
      navigate('/list')
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <img src={SimplyTodoLogo} alt="logo" />
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {showLoginError && (
              <Alert severity="error">
                <AlertTitle>Error</AlertTitle>
                Username/Password incorrect
              </Alert>
            )}
            <TextField
              disabled={loading}
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              disabled={loading}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  )
}
export default Login

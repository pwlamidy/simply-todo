import { Alert, AlertTitle } from '@mui/material'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../store'
import SimplyTodoLogo from '../styles/images/simplytodo.png'
import { signUp } from '../utils/api/auth'

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

export default function SignUp() {
  const navigate = useNavigate()
  const [showSignUpSuccess, setShowSignUpSuccess] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')
  const [showSignUpError, setShowSignUpError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const { loading, toggleLoading } = useStore()

  useEffect(() => {
    return () => {
      setShowSignUpSuccess(false)
      setSuccessMessage('')

      setShowSignUpError(false)
      setErrorMessage('')
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    toggleLoading()

    const res = await signUp(
      event.currentTarget.email.value,
      event.currentTarget.username.value,
      event.currentTarget.password.value
    )

    toggleLoading()

    if (res.status === 200) {
      setShowSignUpError(false)
      setErrorMessage('')
      setShowSignUpSuccess(false)
      setSuccessMessage(
        'Sign up success! You will be redirected to login page.'
      )

      setTimeout(() => navigate('/login'), 5000)
    } else if (res.status === 400) {
      setShowSignUpError(true)
      setErrorMessage(res.data.message)
    } else {
      setShowSignUpError(true)
      setErrorMessage('Invalid email/username/password')
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
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              {showSignUpSuccess && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {successMessage}
                  </Alert>
                </Grid>
              )}
              {showSignUpError && (
                <Grid item xs={12}>
                  <Alert severity="error">
                    <AlertTitle>Error</AlertTitle>
                    {errorMessage}
                  </Alert>
                </Grid>
              )}
              <Grid item xs={12}>
                <TextField
                  disabled={loading}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={loading}
                  autoComplete="username"
                  name="username"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  disabled={loading}
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              disabled={loading}
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  )
}

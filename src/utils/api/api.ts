import dayjs from 'dayjs'
import ky from 'ky'
import { parseJWT } from '../helper'

async function getRefreshToken() {
  const refreshToken = localStorage.getItem('SIMPLY_TODO_REFRESH_TOKEN')

  const refreshRes: any = await fetch(
    `${process.env.REACT_APP_AUTH_REFRESH_TOKEN_ENDPOINT}`,
    {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ refreshToken }),
    }
  )

  const data = await refreshRes.json()

  if (refreshRes.status === 200) {
    localStorage.setItem('SIMPLY_TODO_ACCESS_TOKEN', data['accessToken'])
    localStorage.setItem('SIMPLY_TODO_REFRESH_TOKEN', data['refreshToken'])
  } else {
    localStorage.removeItem('SIMPLY_TODO_ACCESS_TOKEN')
    localStorage.removeItem('SIMPLY_TODO_REFRESH_TOKEN')
    if (window.confirm('Error: Session expired. Please login again.')) {
      window.location.replace('/login')
    }
  }
}

export const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const accessToken = localStorage.getItem('SIMPLY_TODO_ACCESS_TOKEN')

        request.headers.set('Authorization', `Bearer ${accessToken}`)
      },
    ],
    afterResponse: [
      async (request, options, response) => {
        // Retry with a fresh token on a 401/403 error
        if (response.status === 401 || response.status === 403) {
          // Get a fresh token
          await getRefreshToken()

          const accessToken = localStorage.getItem('SIMPLY_TODO_ACCESS_TOKEN')

          // Retry with the token
          request.headers.set('Authorization', `Bearer ${accessToken}`)

          return ky(request)
        }
      },
      async (_request, _options, response) => {
        // Refresh access token that is about to expire
        const accessToken = localStorage.getItem('SIMPLY_TODO_ACCESS_TOKEN')

        if (accessToken && accessToken.length > 0) {
          const { exp } = parseJWT(accessToken)
          if (exp * 1000 <= dayjs().add(5, 'minute').valueOf()) {
            // Get a fresh token
            await getRefreshToken()
          }
        }
      },
    ],
  },
})

import dayjs from 'dayjs'
import ky from 'ky'
import { parseJWT } from '../helper'

setInterval(async () => {
  const storedState: any = JSON.parse(localStorage.getItem('SIMPLY_TODO')!)
  const accessToken = storedState?.state?.accessToken

  if (accessToken && accessToken.length > 0) {
    const { exp } = parseJWT(accessToken)
    if (exp * 1000 <= dayjs().add(15, 'minute').valueOf()) {
      const refreshToken = storedState?.state?.refreshToken

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

      const newState = { ...storedState }
      newState.state.accessToken = data['accessToken']
      newState.state.refreshToken = data['refreshToken']
      localStorage.setItem('SIMPLY_TODO', JSON.stringify(newState))
    }
  }
}, 120000)

export const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        let accessToken = ''
        try {
          const storedState: any = JSON.parse(
            localStorage.getItem('SIMPLY_TODO')!
          )
          accessToken = storedState?.state?.accessToken
        } catch (err) {
          console.log(err)
        }

        request.headers.set('Authorization', `Bearer ${accessToken}`)
      },
    ],
  },
})

import ky from 'ky'

let accessToken = ''
try {
  const storedState: any = JSON.parse(localStorage.getItem('SIMPLY_TODO')!)
  accessToken = storedState?.state?.accessToken
} catch (err) {
  console.log(err)
}

export const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        request.headers.set('Authorization', `Bearer ${accessToken}`)
      },
    ],
  },
})

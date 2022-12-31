import ky from 'ky'

export const api = ky.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        let accessToken = ''
        try {
          const storedState: any = JSON.parse(localStorage.getItem('SIMPLY_TODO')!)
          accessToken = storedState?.state?.accessToken
        } catch (err) {
          console.log(err)
        }
      
        request.headers.set('Authorization', `Bearer ${accessToken}`)
      },
    ],
  },
})

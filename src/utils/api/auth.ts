export const signInByUsername = async (username: string, password: string) => {
  const userData = {
    username,
    password,
  }

  const res = await fetch(`${process.env.REACT_APP_AUTH_SIGNIN_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(userData),
  })

  const data = await res.json()

  return { status: res.status, data }
}

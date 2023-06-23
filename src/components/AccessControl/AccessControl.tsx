import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../../firebase'
import { useStore } from '../../store'

type Props = {
  children: JSX.Element
  renderNoAccess: JSX.Element
}

function AccessControl({ children, renderNoAccess }: Props): JSX.Element {
  const navigate = useNavigate()
  const { setAuthData } = useStore()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setAuthData({ accessToken: '', refreshToken: '', user: firebaseUser })

      const token = firebaseUser?.getIdToken()
      if (token === undefined) {
        navigate('/no-access')
      }
    })

    return unsubscribe
  }, [setAuthData, navigate])

  return children
}
export default AccessControl

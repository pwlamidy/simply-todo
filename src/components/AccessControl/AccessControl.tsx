import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store'
import { parseJWT } from '../../utils/helper'

type Props = {
  children: JSX.Element
  renderNoAccess: JSX.Element
}

function AccessControl({ children, renderNoAccess }: Props): JSX.Element {
  const navigate = useNavigate()
  const { accessToken } = useStore()

  const permitted = useMemo(() => {
    let hasValidToken = false
    if (accessToken && accessToken.length > 0) {
      const payload = parseJWT(accessToken)
      hasValidToken = payload.exp * 1000 >= Date.now()
    }
    return hasValidToken
  }, [accessToken])

  useEffect(() => {
    if (!permitted) {
      navigate('/no-access')
    }
  }, [permitted, navigate])

  if (permitted) {
    return children
  }

  return renderNoAccess
}
export default AccessControl

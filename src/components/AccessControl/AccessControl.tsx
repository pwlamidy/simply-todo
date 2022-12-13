import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStore } from '../../store'

type Props = {
  children: JSX.Element
  renderNoAccess: JSX.Element
}

function AccessControl({ children, renderNoAccess }: Props): JSX.Element {
  const navigate = useNavigate()
  const { accessToken } = useStore()

  const permitted = useMemo(() => {
    return accessToken && accessToken.length > 0
  }, [accessToken])

  useEffect(() => {
    if (!permitted) {
      navigate('/no-access')
    }
  }, [permitted])

  if (permitted) {
    return children
  }

  return renderNoAccess
}
export default AccessControl

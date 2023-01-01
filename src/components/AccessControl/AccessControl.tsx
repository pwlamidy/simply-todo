import { useEffect, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  children: JSX.Element
  renderNoAccess: JSX.Element
}

function AccessControl({ children, renderNoAccess }: Props): JSX.Element {
  const navigate = useNavigate()

  const permitted = useMemo(() => {
    const accessToken = localStorage.getItem("SIMPLY_TODO_ACCESS_TOKEN")
    return accessToken && accessToken.length > 0
  }, [])

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

import { useMemo } from 'react'
import { useStore } from '../../store'

type Props = {
  children: JSX.Element
  renderNoAccess: JSX.Element
}

function AccessControl({
  children,
  renderNoAccess,
}: Props): JSX.Element {
  const { accessToken } = useStore()

  const permitted = useMemo(() => {
    return accessToken && accessToken.length > 0
  }, [accessToken])

  if (permitted) {
    return children
  }

  return renderNoAccess
}
export default AccessControl

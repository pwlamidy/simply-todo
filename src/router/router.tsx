import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import AccessControl from '../components/AccessControl/AccessControl'
import NoAccess from '../components/AccessControl/NoAccess'
import LoadingSpinner from '../components/LoadingSpinner'
import { routerType } from '../types/router.types'
import pagesData from './pagesData'

const Router = () => {
  const pageRoutes = pagesData.map(({ path, title, element }: routerType) => {
    return (
      <Route
        key={title}
        path={`/${path}`}
        element={
          <AccessControl renderNoAccess={<NoAccess />}>
            <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>
          </AccessControl>
        }
      />
    )
  })

  return <Routes>{pageRoutes}</Routes>
}

export default Router

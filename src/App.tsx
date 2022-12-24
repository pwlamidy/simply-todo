import { Suspense, useEffect } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css'
import AccessControl from './components/AccessControl/AccessControl'
import NoAccess from './components/AccessControl/NoAccess'
import PageNotFound from './components/AccessControl/PageNotFound'
import AppLayout from './components/Layout/AppLayout'
import LoadingSpinner from './components/LoadingSpinner'
import pagesData from './router/pagesData'
import { useStore } from './store'
import { RouterType } from './types/router.types'
import { parseJWT } from './utils/helper'

function App() {
  const { accessToken } = useStore()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (location.pathname === '/') {
      let defaultRoute = '/login'
      if (accessToken && accessToken.trim()) {
        const payload = parseJWT(accessToken)
        if (payload.exp && payload.exp * 1000 >= Date.now()) {
          defaultRoute = '/list'
        }
      }
      navigate(defaultRoute)
    }
  }, [accessToken, location, navigate])

  return (
    <Routes>
      {pagesData
        .filter((p) => !p.protected)
        .map(({ path, title, element }: RouterType) => {
          return (
            <Route
              key={title}
              path={`/${path}`}
              element={
                <Suspense fallback={<LoadingSpinner />}>{element}</Suspense>
              }
            />
          )
        })}
      <Route element={<AppLayout />}>
        {pagesData
          .filter((p) => p.protected)
          .map(({ path, title, element }: RouterType) => {
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
          })}
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  )
}

export default App

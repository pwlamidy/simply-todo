import { Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import AccessControl from './components/AccessControl/AccessControl'
import NoAccess from './components/AccessControl/NoAccess'
import AppLayout from './components/Layout/AppLayout'
import LoadingSpinner from './components/LoadingSpinner'
import pagesData from './router/pagesData'
import { RouterType } from './types/router.types'

function App() {
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
    </Routes>
  )
}

export default App

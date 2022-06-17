import {FC} from 'react'
import {Routes, Route, BrowserRouter, Navigate} from 'react-router-dom'
import {PrivateRoutes} from './PrivateRoutes'
import {ErrorsPage} from '../modules/errors/ErrorsPage'
import {Logout, AuthPage, useAuth} from '../modules/auth'
import {App} from '../App'
import { AuthAdminPage } from '../modules/auth/AuthAdminPage'

const {PUBLIC_URL} = process.env

const AppRoutes: FC = () => {
  const { currentUser, currentAdmin } = useAuth()
  
  return (
    <BrowserRouter basename={PUBLIC_URL}>
      <Routes>
        <Route element={<App />}>
          <Route path='error/*' element={<ErrorsPage />} />
          <Route path='logout' element={<Logout />} />
          {(currentUser || currentAdmin) ? (
            <>
              <Route path='/*' element={<PrivateRoutes />} />
              {currentAdmin && <Route index element={<Navigate to='/admin/tablero' />} />}
              {currentUser && <Route index element={<Navigate to='/tablero' />} />}
            </>
          ) : (
            <>
              <Route path='login/*' element={<AuthPage />} />
              <Route path='admin/login/*' element={<AuthAdminPage />} />
              <Route path='admin/*' element={<Navigate to='/admin/login' />} />
              <Route path='*' element={<Navigate to='/login' />} />
            </>
          )}
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export {AppRoutes}

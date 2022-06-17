/* eslint-disable jsx-a11y/anchor-is-valid */
import {useEffect} from 'react'
import {Outlet, Route, Routes} from 'react-router-dom'
import {toAbsoluteUrl} from '../../../_metronic/helpers'
import { LoginAdmin } from './components/LoginAdmin'

const AuthLayout = () => {
  useEffect(() => {
    document.body.classList.add('bg-white')
    return () => {
      document.body.classList.remove('bg-white')
    }
  }, [])

  return (
    <div
      className='d-flex flex-column flex-column-fluid bgi-position-y-bottom position-x-center bgi-no-repeat bgi-size-contain bgi-attachment-fixed'
      style={{
        background: '#000',
      }}
    >
      <div className='d-flex flex-center flex-column flex-column-fluid p-10 pb-lg-20'>
        <a href='/admin/login' className='mb-12'>
          <img alt='Logo' src={toAbsoluteUrl('/media/logos/logo.png')} className='h-150px' />
        </a>
        <div className='w-lg-500px bg-white rounded shadow-sm p-10 p-lg-15 mx-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

const AuthAdminPage = () => (
  <Routes>
    <Route element={<AuthLayout />}>
      <Route path='login' element={<LoginAdmin />} />
      <Route index element={<LoginAdmin />} />
    </Route>
  </Routes>
)

export {AuthAdminPage}

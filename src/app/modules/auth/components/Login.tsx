/* eslint-disable jsx-a11y/anchor-is-valid */
import {useState} from 'react'
import * as Yup from 'yup'
import clsx from 'clsx'
import {Link} from 'react-router-dom'
import {useFormik} from 'formik'
import {
  // getUserByToken, 
  login
} from '../core/_requests'
import {useAuth} from '../core/Auth'
import { openNotification } from '../../../../utils/openNotification'

const loginSchema = Yup.object().shape({
  user: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Usuario requerido'),
  password: Yup.string()
    .min(3, 'Mínimo 3 caracteres')
    .max(50, 'Máximo 50 caracteres')
    .required('Contraseña requerida'),
})

const initialValues = {
  user: '',
  password: '',
}

export function Login() {
  const [loading, setLoading] = useState(false)
  const {saveAuth, setCurrentUser} = useAuth()

  const formik = useFormik({
    initialValues,
    validationSchema: loginSchema,
    onSubmit: async (values, {setStatus, setSubmitting}) => {
      setLoading(true)
      try {
        const {data: auth} = await login(values.user, values.password);
        if (auth.success) {
          saveAuth(auth)
          setCurrentUser(auth.data)
          // const {data: user} = await getUserByToken(auth.message)
        } else {
          openNotification('Login', 'warning', auth.message)
          saveAuth(undefined)
          setStatus(auth.message)
          setSubmitting(false)
          setLoading(false)
        }
      } catch (error) {
        openNotification('Login', 'danger')
        saveAuth(undefined)
        setStatus('Datos de ingreso incorrectos.')
        setSubmitting(false)
        setLoading(false)
      }
    },
  })

  return (
    <form
      className='form w-100'
      onSubmit={formik.handleSubmit}
      noValidate
      id='kt_login_signin_form'
    >
      <div className='text-center mb-10'>
        <h1 className='text-dark mb-3'>Bienvenido</h1>
      </div>

      <div className='fv-row mb-10'>
        <label className='form-label fs-6 fw-bolder text-dark'>Usuario</label>
        <input
          {...formik.getFieldProps('user')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {'is-invalid': formik.touched.user && formik.errors.user},
            {
              'is-valid': formik.touched.user && !formik.errors.user,
            }
          )}
          type='text'
          name='user'
          autoComplete='off'
        />
        {formik.touched.user && formik.errors.user && (
          <div className='fv-plugins-message-container'>
            <span role='alert'>{formik.errors.user}</span>
          </div>
        )}
      </div>

      <div className='fv-row mb-10'>
        <div className='d-flex justify-content-between mt-n5'>
          <div className='d-flex flex-stack mb-2'>
            <label className='form-label fw-bolder text-dark fs-6 mb-0'>Contraseña</label>
            <Link
              to='/auth/forgot-password'
              className='link-primary fs-6 fw-bolder'
              style={{marginLeft: '5px'}}
            >
              Recuperar contraseña
            </Link>
          </div>
        </div>
        <input
          type='password'
          autoComplete='off'
          {...formik.getFieldProps('password')}
          className={clsx(
            'form-control form-control-lg form-control-solid',
            {
              'is-invalid': formik.touched.password && formik.errors.password,
            },
            {
              'is-valid': formik.touched.password && !formik.errors.password,
            }
          )}
        />
        {formik.touched.password && formik.errors.password && (
          <div className='fv-plugins-message-container'>
            <div className='fv-help-block'>
              <span role='alert'>{formik.errors.password}</span>
            </div>
          </div>
        )}
      </div>
      
      <div className='text-center'>
        <button
          type='submit'
          id='kt_sign_in_submit'
          className='btn btn-lg btn-primary w-100 mb-5'
          disabled={formik.isSubmitting || !formik.isValid}
        >
          {!loading && <span className='indicator-label'>Continuar</span>}
          {loading && (
            <span className='indicator-progress' style={{display: 'block'}}>
              Por favor espere...
              <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
            </span>
          )}
        </button>
      </div>
    </form>
  )
}

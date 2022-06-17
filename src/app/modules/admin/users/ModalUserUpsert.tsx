import {
  FC, 
  // useState
} from 'react'
import * as Yup from 'yup'
import {useFormik} from 'formik'
import clsx from 'clsx'
import { User } from './constants'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'

type Props = {
  isUserLoading: boolean
  user: User
  setModalVisible: (flag: boolean) => void
}

const editUserSchema = Yup.object().shape({
  correo: Yup.string()
    .email('Correo no valido')
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres')
    .required('Correo requerido'),
  nombre: Yup.string()
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres')
    .required('Nombre requerido'),
  apellido_paterno: Yup.string()
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres')
    .required('Apellido paterno requerido'),
  apellido_materno: Yup.string()
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres')
    .required('Apellido materno requerido'),
  celular: Yup.string()
    .length(9, 'Número invalido'),
  dni: Yup.string()
    .length(8, 'DNI invalido')
    .required('DNI requerido'),
  direccion: Yup.string()
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres'),
})

const ModalUserUpsert: FC<Props> = ({user, isUserLoading, setModalVisible}) => {
  const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  const userAvatarImg = toAbsoluteUrl(`/media/${user.avatar}`)

  const formik = useFormik({
    initialValues: user,
    validationSchema: editUserSchema,
    onSubmit: async (values, {setSubmitting}) => {
      setSubmitting(true)
    },
  })

  return (
    <>
      <div
        className='modal fade show d-block'
        id='kt_modal_add_user'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        {/* begin::Modal dialog */}
        <div className='modal-dialog modal-dialog-centered mw-650px'>
          {/* begin::Modal content */}
          <div className='modal-content'>
            <div className='modal-header'>
              {/* begin::Modal title */}
              <h2 className='fw-bolder'>Agregar Usuario</h2>
              {/* end::Modal title */}

              {/* begin::Close */}
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={() => setModalVisible(false)}
                style={{cursor: 'pointer'}}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
              {/* end::Close */}
            </div>
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <>
                <form id='form_upsert_user' className='form' onSubmit={formik.handleSubmit} noValidate>
                  {/* begin::Scroll */}
                  <div
                    className='d-flex flex-column scroll-y me-n7 pe-7'
                    id='kt_modal_add_user_scroll'
                    data-kt-scroll='true'
                    data-kt-scroll-activate='{default: false, lg: true}'
                    data-kt-scroll-max-height='auto'
                    data-kt-scroll-dependencies='#kt_modal_add_user_header'
                    data-kt-scroll-wrappers='#kt_modal_add_user_scroll'
                    data-kt-scroll-offset='300px'
                  >
                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                      {/* begin::Label */}
                      <label className='d-block fw-bold fs-6 mb-5'>Avatar</label>
                      {/* end::Label */}

                      {/* begin::Image input */}
                      <div
                        className='image-input image-input-outline'
                        data-kt-image-input='true'
                        style={{backgroundImage: `url('${blankImg}')`}}
                      >
                        {/* begin::Preview existing avatar */}
                        <div
                          className='image-input-wrapper w-125px h-125px'
                          style={{backgroundImage: `url('${userAvatarImg}')`}}
                        ></div>
                        {/* end::Preview existing avatar */}

                        {/* begin::Label */}
                        {/* <label
                        className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                        data-kt-image-input-action='change'
                        data-bs-toggle='tooltip'
                        title='Change avatar'
                      >
                        <i className='bi bi-pencil-fill fs-7'></i>

                        <input type='file' name='avatar' accept='.png, .jpg, .jpeg' />
                        <input type='hidden' name='avatar_remove' />
                      </label> */}
                        {/* end::Label */}

                        {/* begin::Cancel */}
                        {/* <span
                        className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                        data-kt-image-input-action='cancel'
                        data-bs-toggle='tooltip'
                        title='Cancel avatar'
                      >
                        <i className='bi bi-x fs-2'></i>
                      </span> */}
                        {/* end::Cancel */}

                        {/* begin::Remove */}
                        {/* <span
                        className='btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow'
                        data-kt-image-input-action='remove'
                        data-bs-toggle='tooltip'
                        title='Remove avatar'
                      >
                        <i className='bi bi-x fs-2'></i>
                      </span> */}
                        {/* end::Remove */}
                      </div>
                      {/* end::Image input */}

                      {/* begin::Hint */}
                      {/* <div className='form-text'>Allowed file types: png, jpg, jpeg.</div> */}
                      {/* end::Hint */}
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                      <label className='required fw-bold fs-6 mb-2'>Nombre</label>
                      <input
                        {...formik.getFieldProps('nombre')}
                        type='text'
                        name='nombre'
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          {'is-invalid': formik.touched.nombre && formik.errors.nombre},
                          {
                            'is-valid': formik.touched.nombre && !formik.errors.nombre,
                          }
                        )}
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                      />
                      {formik.touched.nombre && formik.errors.nombre && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.nombre}</span>
                          </div>
                        </div>
                      )}
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='row'>
                      <div className="col">
                        <div className='fv-row mb-7'>
                          <label className='required fw-bold fs-6 mb-2'>Apellido Paterno</label>
                          <input
                            {...formik.getFieldProps('apellido_paterno')}
                            type='text'
                            name='apellido_paterno'
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              {'is-invalid': formik.touched.apellido_paterno && formik.errors.apellido_paterno},
                              {
                                'is-valid': formik.touched.apellido_paterno && !formik.errors.apellido_paterno,
                              }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                          />
                          {formik.touched.apellido_paterno && formik.errors.apellido_paterno && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.apellido_paterno}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className='fv-row mb-7'>
                          <label className='required fw-bold fs-6 mb-2'>Apellido Paterno</label>
                          <input
                            {...formik.getFieldProps('apellido_materno')}
                            type='text'
                            name='apellido_materno'
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              {'is-invalid': formik.touched.apellido_materno && formik.errors.apellido_materno},
                              {
                                'is-valid': formik.touched.apellido_materno && !formik.errors.apellido_materno,
                              }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                          />
                          {formik.touched.apellido_materno && formik.errors.apellido_materno && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.apellido_materno}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                      <label className='required fw-bold fs-6 mb-2'>Correo</label>
                      <input
                        placeholder='ejemplo@ejemplo.ejemplo'
                        {...formik.getFieldProps('correo')}
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          {'is-invalid': formik.touched.correo && formik.errors.correo},
                          {
                            'is-valid': formik.touched.correo && !formik.errors.correo,
                          }
                        )}
                        type='correo'
                        name='correo'
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                      />
                      {formik.touched.correo && formik.errors.correo && (
                        <div className='fv-plugins-message-container'>
                          <span role='alert'>{formik.errors.correo}</span>
                        </div>
                      )}
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='row'>
                      <div className="col">
                        <div className='fv-row mb-7'>
                          <label className='fw-bold fs-6 mb-2'>Número Celular</label>
                          <input
                            {...formik.getFieldProps('celular')}
                            type='text'
                            name='celular'
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              {'is-invalid': formik.touched.celular && formik.errors.celular},
                              {
                                'is-valid': formik.touched.celular && !formik.errors.celular,
                              }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                          />
                          {formik.touched.celular && formik.errors.celular && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.celular}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        <div className='fv-row mb-7'>
                          <label className='required fw-bold fs-6 mb-2'>DNI</label>
                          <input
                            {...formik.getFieldProps('dni')}
                            type='text'
                            name='dni'
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              {'is-invalid': formik.touched.dni && formik.errors.dni},
                              {
                                'is-valid': formik.touched.dni && !formik.errors.dni,
                              }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                          />
                          {formik.touched.dni && formik.errors.dni && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.dni}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* end::Input group */}

                    {/* begin::Input group */}
                    <div className='fv-row mb-7'>
                      <label className='fw-bold fs-6 mb-2'>Dirección</label>
                      <input
                        {...formik.getFieldProps('direccion')}
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          {'is-invalid': formik.touched.direccion && formik.errors.direccion},
                          {
                            'is-valid': formik.touched.direccion && !formik.errors.direccion,
                          }
                        )}
                        type='direccion'
                        name='direccion'
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                      />
                      {formik.touched.direccion && formik.errors.direccion && (
                        <div className='fv-plugins-message-container'>
                          <span role='alert'>{formik.errors.direccion}</span>
                        </div>
                      )}
                    </div>
                    {/* end::Input group */}
                  </div>
                  {/* end::Scroll */}

                  {/* begin::Actions */}
                  <div className='text-center pt-15'>
                    <button
                      type='reset'
                      onClick={() => setModalVisible(false)}
                      className='btn btn-light me-3'
                      data-kt-users-modal-action='cancel'
                      disabled={formik.isSubmitting || isUserLoading}
                    >
                      Cancelar
                    </button>

                    <button
                      type='submit'
                      className='btn btn-primary'
                      data-kt-users-modal-action='submit'
                      disabled={isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched}
                    >
                      <span className='indicator-label'>Guardar</span>
                      {(formik.isSubmitting || isUserLoading) && (
                        <span className='indicator-progress'>
                          Guardando...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                        </span>
                      )}
                    </button>
                  </div>
                  {/* end::Actions */}
                </form>
                {/* {(formik.isSubmitting || isUserLoading) && <UsersListLoading />} */}
              </>
            </div>
            {/* end::Modal body */}
          </div>
          {/* end::Modal content */}
        </div>
        {/* end::Modal dialog */}
      </div>
      {/* begin::Modal Backdrop */}
      <div className='modal-backdrop fade show'></div>
    </>
  )
}

export {ModalUserUpsert}

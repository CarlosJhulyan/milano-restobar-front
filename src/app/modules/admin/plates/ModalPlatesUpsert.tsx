import {
  FC,
  LegacyRef,
  useEffect,
  useRef,
  useState,
  // useState
} from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import clsx from 'clsx'
import { Plate } from './constantsPlates'
import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { addPlates, editPlates } from './_request'
import { openNotification } from '../../../../utils/openNotification'
import { getImageUrlBackend } from '../../../../_metronic/helpers/getImageUrlBackend'

type Props = {
  isUserLoading: boolean
  plate: Plate
  setMostrarModal: (flag: boolean) => void
  getDataUsers: () => void
  dataCate: any[]
}

const editUserSchema = Yup.object().shape({
  vta_nombre_plato: Yup.string()
    .required('Nombre requerido'),
  vta_desc_plato: Yup.string()
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres')
    .required('Descripcion requerido'),
  vta_precio: Yup.number()
    .required('Precio requerido'),
  vta_dificultad_id_vta_dificultad: Yup.number()
    .required('Dificultad requerido'),
  vta_categoria_id_vta_categoria: Yup.string().required('Categoria requerido'),
  id_cme_receta: Yup.string().required('Receta requerido'),
})

const ModalPlatesUpsert: FC<Props> = ({ plate, isUserLoading, setMostrarModal, getDataUsers, dataCate }) => {
  // const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  // const userAvatarImg = toAbsoluteUrl(`/media/${user.avatar}`)

  console.log(dataCate, 'categorrias');

  const [imagenURL, setImagenURL] = useState<string | null>(null)
  const [imagen, setImagen] = useState<File | null>(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (plate && plate.vta_ruta_imagen_plato) {
      setImagenURL(getImageUrlBackend(`/plates/${plate.vta_ruta_imagen_plato}`))
    }
  }, [plate])

  const formik = useFormik({
    initialValues: plate,
    validationSchema: editUserSchema,
    onSubmit: async (values, { setSubmitting }) => {

      console.log(values, 'values agregar');

      setSubmitting(true)
      try {
        let data: { success: boolean; message: string }
        if (values.id_vta_plato !== '') {
          const response = await editPlates(values, imagen!)
          console.log(response, 'update');

          data = response.data
        } else {
          const response = await addPlates(values, imagen!)
          console.log(response, 'agregar');

          data = response.data
        }
        if (data.success) {
          getDataUsers()
          setSubmitting(false)
          setMostrarModal(false)
          openNotification('Usuario', 'success', data.message)
        } else {
          setSubmitting(false)
          openNotification('Usuario', 'warning', data.message)
        }
      } catch (error) {
        getDataUsers()
        setSubmitting(false)
        setMostrarModal(false)
        openNotification('Usuario', 'danger')
      }
    },
  })

  const handleFile = (event: any) => {
    setImagenURL(URL.createObjectURL(event.target.files[0]))
    setImagen(event.target.files[0])
  }

  function changeBackgroundHover(e: any) {
    e.target.style.background = 'rgba(0,0,0,0.3)'
    setHover(true)
  }

  function changeBackgroundLeave(e: any) {
    e.target.style.background = 'rgba(255,255,255,0)'
    setHover(false)
  }

  const hiddenFileInput = useRef<HTMLInputElement>(null)

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
              <h2 className='fw-bolder'>Agregar Platillo</h2>
              {/* end::Modal title */}

              {/* begin::Close */}
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={() => setMostrarModal(false)}
                style={{ cursor: 'pointer' }}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
              {/* end::Close */}
            </div>
            {/* begin::Modal body */}
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <>
                <div className='fv-row mb-7'>
                  {/* begin::Label */}
                  <label className='d-block fw-bold fs-6 mb-5'>Avatar</label>
                  {/* end::Label */}
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    {imagenURL == null ? (
                      <>
                        <input
                          style={{ display: 'none' }}
                          type='file'
                          accept='.jpg,.jpeg,.png'
                          onChange={handleFile}
                          ref={hiddenFileInput}
                        />
                        <button
                          style={{
                            height: '100px',
                            width: '100px',
                            whiteSpace: 'break-spaces',
                            textAlign: 'center',
                            lineHeight: '20px',
                          }}
                          onClick={() => hiddenFileInput?.current!.click()}
                        >
                          Subir imagen
                        </button>
                      </>
                    ) : (
                      <div
                        style={{
                          height: '100px',
                          width: '100px',
                          position: 'relative',
                        }}
                        onClick={() => {
                          setImagenURL(null)
                        }}
                      >
                        <div
                          style={{
                            position: 'absolute',
                            top: '-2px',
                            bottom: '-2px',
                            left: '-2px',
                            right: '-2px',
                            margin: 'auto',
                            width: 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textAlign: 'center',
                          }}
                          onMouseOver={changeBackgroundHover}
                          onMouseLeave={changeBackgroundLeave}
                        >
                          {hover ? <i className='bi bi-x fs-2'></i> : null}
                        </div>
                        <img
                          src={imagenURL}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'contain',
                          }}
                          alt='imagen'
                        />
                      </div>
                    )}
                  </div>

                </div>
                <form
                  id='form_upsert_user'
                  className='form'
                  onSubmit={formik.handleSubmit}
                  noValidate
                >
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


                    <div className='fv-row mb-7'>
                      <label className='required fw-bold fs-6 mb-2'>Nombre</label>
                      <input
                        {...formik.getFieldProps('vta_nombre_plato')}
                        type='text'
                        name='vta_nombre_plato'
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          { 'is-invalid': formik.touched.vta_nombre_plato && formik.errors.vta_nombre_plato },
                          {
                            'is-valid': formik.touched.vta_nombre_plato && !formik.errors.vta_nombre_plato,
                          }
                        )}
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                      />
                      {formik.touched.vta_nombre_plato && formik.errors.vta_nombre_plato && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.vta_nombre_plato}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='fv-row mb-7'>
                      <label className='required fw-bold fs-6 mb-2'>Descripcion</label>
                      <input
                        {...formik.getFieldProps('vta_desc_plato')}
                        type='text'
                        name='vta_desc_plato'
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          { 'is-invalid': formik.touched.vta_desc_plato && formik.errors.vta_desc_plato },
                          {
                            'is-valid': formik.touched.vta_desc_plato && !formik.errors.vta_desc_plato,
                          }
                        )}
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                      />
                      {formik.touched.vta_desc_plato && formik.errors.vta_desc_plato && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.vta_desc_plato}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='row'>
                      <div className='col'>
                        <div className='fv-row mb-7'>
                          <label className='required fw-bold fs-6 mb-2'>Precio</label>
                          <input
                            {...formik.getFieldProps('vta_precio')}
                            type='text'
                            name='vta_precio'
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              { 'is-invalid': formik.touched.vta_precio && formik.errors.vta_precio },
                              {
                                'is-valid': formik.touched.vta_precio && !formik.errors.vta_precio,
                              }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                          />
                          {formik.touched.vta_precio && formik.errors.vta_precio && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.vta_precio}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className='col'>
                        <div className='fv-row mb-7'>
                          <label className='required fw-bold fs-6 mb-2'>Dificultad</label>
                          <div className='col-lg-8 fv-row'>
                            <select
                              className='form-select form-select-solid form-select-lg'
                              {...formik.getFieldProps('vta_dificultad_id_vta_dificultad')}
                              name='vta_dificultad_id_vta_dificultad'
                            >
                              <option value=''>Seleccionar rol de usuario...</option>
                              <option value='1'>Facil</option>
                            </select>
                            {formik.touched.vta_dificultad_id_vta_dificultad && formik.errors.vta_dificultad_id_vta_dificultad && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{formik.errors.vta_dificultad_id_vta_dificultad}</div>
                              </div>
                            )}
                          </div>
                          {formik.touched.vta_dificultad_id_vta_dificultad && formik.errors.vta_dificultad_id_vta_dificultad && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.vta_dificultad_id_vta_dificultad}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className='row'>
                      <div className='col'>
                        <div className='fv-row mb-7'>
                          <label className='required fw-bold fs-6 mb-2'>Categorias</label>

                          <div className='col-lg-8 fv-row'>

                            <select
                              // name='vta_dificultad_id_vta_dificultad'
                              className='form-select form-select-solid form-select-lg'
                              {...formik.getFieldProps('vta_categoria_id_vta_categoria')}
                              name='vta_categoria_id_vta_categoria'
                            >
                              <option value=''>Selecciona una categoria...</option>
                              {
                                dataCate.map(element => {

                                  // console.log(element, 'element');

                                  return (
                                    <option value={element.id_vta_categoria}>{element.descripcion_categoria}</option>

                                  )
                                })
                              }
                              {/* <option value='C'>Cocinero</option>
                  <option value='O'>Cajero</option>
                  <option value='M'>Mesero</option> */}
                            </select>

                            {/* <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='usuario'
                  // disabled
                  {...formik.getFieldProps('nombre')}
                /> */}
                            {formik.touched.vta_categoria_id_vta_categoria && formik.errors.vta_categoria_id_vta_categoria && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{formik.errors.vta_categoria_id_vta_categoria}</div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className='col'>
                        <div className='fv-row mb-7'>
                          <label className='required fw-bold fs-6 mb-2'>Receta</label>
                          <input
                            {...formik.getFieldProps('id_cme_receta')}
                            type='text'
                            name='id_cme_receta'
                            className={clsx(
                              'form-control form-control-solid mb-3 mb-lg-0',
                              { 'is-invalid': formik.touched.id_cme_receta && formik.errors.id_cme_receta },
                              {
                                'is-valid': formik.touched.id_cme_receta && !formik.errors.id_cme_receta,
                              }
                            )}
                            autoComplete='off'
                            disabled={formik.isSubmitting || isUserLoading}
                          />
                          {formik.touched.id_cme_receta && formik.errors.id_cme_receta && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>
                                <span role='alert'>{formik.errors.id_cme_receta}</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

                    </div>


                  </div>
                  {/* end::Scroll */}

                  {/* begin::Actions */}
                  <div className='text-center pt-15'>
                    <button
                      type='reset'
                      onClick={() => setMostrarModal(false)}
                      className='btn btn-light me-3'
                      data-kt-users-modal-action='cancel'
                    // disabled={formik.isSubmitting || isUserLoading}
                    >
                      Cancelar
                    </button>

                    <button
                      type='submit'
                      className='btn btn-primary'
                      data-kt-users-modal-action='submit'
                      disabled={
                        isUserLoading || formik.isSubmitting || !formik.isValid || !formik.touched
                      }
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

export { ModalPlatesUpsert }

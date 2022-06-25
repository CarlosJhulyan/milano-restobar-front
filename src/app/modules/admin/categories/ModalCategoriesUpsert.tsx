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

import { KTSVG, toAbsoluteUrl } from '../../../../_metronic/helpers'
import { openNotification } from '../../../../utils/openNotification'
import { getImageUrlBackend } from '../../../../_metronic/helpers/getImageUrlBackend'
import {addPlates, editPlates} from "../plates/_request";
import {Category} from "./constantsCategory";

type Props = {
  isUserLoading: boolean
  category: Category
  setMostrarModal: (flag: boolean) => void
  getDataCategories: () => void
}

const editCategorySchema = Yup.object().shape({
  descripcion_categoria: Yup.string()
    .required('Nombre requerido'),
  ruta_icono_categoria: Yup.string()
    .required('Descripcion requerido'),
  cme_encargado_id_cme_encargado: Yup.string()
    .required('Categoria requerido'),
})

const ModalCategoriesUpsert: FC<Props> = ({ category, isUserLoading, setMostrarModal, getDataCategories }) => {
  // const blankImg = toAbsoluteUrl('/media/svg/avatars/blank.svg')
  // const userAvatarImg = toAbsoluteUrl(`/media/${user.avatar}`)

  const [dataCate, setDataCate] = useState<Array<Category>>([])

  const [imagenURL, setImagenURL] = useState<string | null>(null)
  const [imagen, setImagen] = useState<File | null>(null)
  const [hover, setHover] = useState(false)

  useEffect(() => {
    if (category && category.ruta_icono_categoria) {
      setImagenURL(getImageUrlBackend(`/avatars/${category.ruta_icono_categoria}`))
    }
  }, [category])

  const formik = useFormik({
    initialValues: category,
    validationSchema: editCategorySchema,
    onSubmit: async (values, { setSubmitting }) => {

      setSubmitting(true)
      try {
        let data: { success: boolean; message: string }
        if (values.id_vta_categoria !== '') {
          // const response = await editPlates(values, imagen!)
          // console.log(response, 'update');
          //
          // data = response.data
        } else {
          // const response = await addPlates(values, imagen!)
          // console.log(response, 'agregar');
          //
          // data = response.data
        }
        // if (data.success) {
        //   getDataCategories()
        //   setSubmitting(false)
        //   setMostrarModal(false)
        //   openNotification('Usuario', 'success', data.message)
        // } else {
        //   setSubmitting(false)
        //   openNotification('Usuario', 'warning', data.message)
        // }
      } catch (error) {
        getDataCategories()
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
              <h2 className='fw-bolder'>Agregar Categoria</h2>
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={() => setMostrarModal(false)}
                style={{ cursor: 'pointer' }}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
            </div>
            <div className='modal-body scroll-y mx-5 mx-xl-15 my-7'>
              <>
                <div className='fv-row mb-7'>
                  <label className='d-block fw-bold fs-6 mb-5'>Icono</label>
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
                      <label className='required fw-bold fs-6 mb-2'>Descripción</label>
                      <input
                        {...formik.getFieldProps('descripcion_categoria')}
                        type='text'
                        name='vta_desc_plato'
                        className={clsx(
                          'form-control form-control-solid mb-3 mb-lg-0',
                          { 'is-invalid': formik.touched.descripcion_categoria && formik.errors.descripcion_categoria },
                          {
                            'is-valid': formik.touched.descripcion_categoria && !formik.errors.descripcion_categoria,
                          }
                        )}
                        autoComplete='off'
                        disabled={formik.isSubmitting || isUserLoading}
                      />
                      {formik.touched.descripcion_categoria && formik.errors.descripcion_categoria && (
                        <div className='fv-plugins-message-container'>
                          <div className='fv-help-block'>
                            <span role='alert'>{formik.errors.descripcion_categoria}</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className='row'>
                      <div className='col'>
                        <div className='fv-row mb-7'>
                          <label className='required fw-bold fs-6 mb-2'>Encargado</label>

                          <div className='col-lg-8 fv-row'>

                            <select
                              className='form-select form-select-solid form-select-lg'
                              {...formik.getFieldProps('cme_encargado_id_cme_encargado')}
                              name='cme_encargado_id_cme_encargado'
                            >
                              <option value=''>Selecciona un encargado...</option>
                              {
                                dataCate.map(element => {

                                  // console.log(element, 'element');

                                  return (
                                    <option value={element.id_vta_categoria}>{element.descripcion_categoria}</option>

                                  )
                                })
                              }
                            </select>
                            {formik.touched.cme_encargado_id_cme_encargado && formik.errors.cme_encargado_id_cme_encargado && (
                              <div className='fv-plugins-message-container'>
                                <div className='fv-help-block'>{formik.errors.cme_encargado_id_cme_encargado}</div>
                              </div>
                            )}
                          </div>
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

export { ModalCategoriesUpsert }

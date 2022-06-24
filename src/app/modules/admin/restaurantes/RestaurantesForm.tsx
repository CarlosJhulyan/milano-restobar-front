import {useFormik} from 'formik'
import {FC, useState} from 'react'
import {httpClient} from '../../../../api/api'
import {ApiPath} from '../../../../api/constans'
import * as Yup from 'yup'
import {KTCard, KTCardBody} from '../../../../_metronic/helpers'
import {Restaurant} from './constants'
import {addRestaurant} from './_request'
import {openNotification} from '../../../../utils/openNotification'

type Props = {
  getDataTable: () => void
}

const RoleSchema = Yup.object().shape({
  lgt_nombre_resturante: Yup.string()
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres')
    .required('Nombre requerido'),
  lgt_direccion_restaurante: Yup.string()
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres')
    .required('Dirección requerida'),
  lg_ruc_resturante: Yup.string().length(11, 'RUC invalido').required('RUC requerido'),
  lgt_razon_restaurante: Yup.string()
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres')
    .required('Razón social requerida'),
  lgt_horario_apertura: Yup.string()
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres')
    .required('Hora de apertura requerida'),
  lgt_horario_cierre: Yup.string()
    .min(3, 'Mínimo 3 caractéres')
    .max(50, 'Máximo 50 caractéres')
    .required('Hora de cierre requerida'),
})

const RestaurantesForm: FC<Props> = ({getDataTable}) => {
  const [data, setData] = useState<Restaurant>({
    id_lgt_restaurante: '',
    lgt_nombre_resturante: '',
    lgt_direccion_restaurante: '',
    lg_ruc_resturante: '',
    lgt_razon_restaurante: '',
    lgt_horario_apertura: '',
    lgt_horario_cierre: '',
  })

  const [loading, setLoading] = useState(false)

  const formik = useFormik<Restaurant>({
    initialValues: data,
    validationSchema: RoleSchema,
    onSubmit: (values) => handleSubmit(values),
  })

  const handleSubmit = async (values: Restaurant) => {
    setLoading(true)
    try {
      let data: {success: boolean; message: string}
      let response: any
      if (values.id_lgt_restaurante !== '') {
        // response = await editRestaurant(values)
      } else {
        response = await addRestaurant(values)
      }
      data = response.data
      if (data.success) {
        getDataTable()
        openNotification('Restaurant', 'success', data.message)
      } else {
        getDataTable()
        openNotification('Restaurant', 'warning', data.message)
      }
    } catch (error) {
      getDataTable()
      openNotification('Restaurant', 'danger')
    }
    setLoading(false)
  }

  return (
    <KTCard>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#role_form'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Formulario Restaurantes</h3>
        </div>
      </div>
      <KTCardBody>
        <div id='role_form' className='collapse show'>
          <form onSubmit={formik.handleSubmit} noValidate className='form'>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Nombre</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Nombre del restaurante'
                  {...formik.getFieldProps('lgt_nombre_resturante')}
                />
                {formik.touched.lgt_nombre_resturante && formik.errors.lgt_nombre_resturante && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.lgt_nombre_resturante}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>RUC</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='RUC del restaurante'
                  {...formik.getFieldProps('lg_ruc_resturante')}
                />
                {formik.touched.lg_ruc_resturante && formik.errors.lg_ruc_resturante && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.lg_ruc_resturante}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Razón social</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Razón social del restaurante'
                  {...formik.getFieldProps('lgt_razon_restaurante')}
                />
                {formik.touched.lgt_razon_restaurante && formik.errors.lgt_razon_restaurante && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.lgt_razon_restaurante}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Dirección</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='text'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Dirección del restaurante'
                  {...formik.getFieldProps('lgt_direccion_restaurante')}
                />
                {formik.touched.lgt_direccion_restaurante &&
                  formik.errors.lgt_direccion_restaurante && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.lgt_direccion_restaurante}</div>
                    </div>
                  )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Hora de apertura</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='time'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Hora de apertura del restaurante'
                  {...formik.getFieldProps('lgt_horario_apertura')}
                />
                {formik.touched.lgt_horario_apertura && formik.errors.lgt_horario_apertura && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.lgt_horario_apertura}</div>
                  </div>
                )}
              </div>
            </div>
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Hora de cierre</label>

              <div className='col-lg-8 fv-row'>
                <input
                  type='time'
                  className='form-control form-control-lg form-control-solid'
                  placeholder='Hora de cierre del restaurante'
                  {...formik.getFieldProps('lgt_horario_cierre')}
                />
                {formik.touched.lgt_horario_cierre && formik.errors.lgt_horario_cierre && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.lgt_horario_cierre}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {!loading && 'Guardar'}
                  {loading && (
                    <span className='indicator-progress' style={{display: 'block'}}>
                      Guardando...{' '}
                      <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                    </span>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export {RestaurantesForm}

import { useFormik } from 'formik'
import { useState } from 'react'
import { KTCard, KTCardBody } from '../../../../_metronic/helpers'
import { Role, User } from './constats'
import * as Yup from 'yup'
import { httpClient } from '../../../../api/api'
import { ApiPath } from '../../../../api/constans'

const RoleSchema = Yup.object().shape({
  tipo_usuario: Yup.string().required('Seleccione el rol de usuario')
})

const RolesForm = ({ currentUser }: { currentUser: Role[] }) => {
  console.log(currentUser, 'data de props');

  const [data, setData] = useState<Role>({
    id_cme_usuario: '',
    nombre: '',
    tipo_usuario: ''
  })

  const [loading, setLoading] = useState(false);

  const formik = useFormik<Role>({
    initialValues: data,
    validationSchema: RoleSchema,
    onSubmit: (values) => handleSubmit(values)
  })

  const handleSubmit = async (values: Role) => {

    console.log(values, 'valuesss');

    setLoading(true)
    try {
      const { data: { success, message } } = await httpClient.patch(ApiPath.Users.UpdateRole, values)
      console.log(message);

    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }

  // console.log(formik.getFieldProps('nombre'));


  return (
    <KTCard>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        data-bs-target='#role_form'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Asignar Roles</h3>
        </div>
      </div>
      <KTCardBody>
        <div id="role_form" className='collapse show'>
          <form
            onSubmit={formik.handleSubmit}
            noValidate className='form'
          >
            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label fw-bold fs-6'>Usuario</label>

              <div className='col-lg-8 fv-row'>

                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('id_cme_usuario')}
                >
                  <option value=''>Seleccionar al usuario...</option>
                  {
                    currentUser.map(element => {

                      console.log(element, 'element');

                      return (
                        <option value={element.id_cme_usuario}>{element.nombre}</option>

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
                {formik.touched.nombre && formik.errors.nombre && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.nombre}</div>
                  </div>
                )}
              </div>
            </div>

            <div className='row mb-6'>
              <label className='col-lg-4 col-form-label required fw-bold fs-6'>Rol de usuario</label>
              <div className='col-lg-8 fv-row'>
                <select
                  className='form-select form-select-solid form-select-lg'
                  {...formik.getFieldProps('tipo_usuario')}
                >
                  <option value=''>Seleccionar rol de usuario...</option>
                  <option value='C'>Cocinero</option>
                  <option value='O'>Cajero</option>
                  <option value='M'>Mesero</option>
                  <option value='B'>Bartender</option>
                </select>
                {formik.touched.tipo_usuario && formik.errors.tipo_usuario && (
                  <div className='fv-plugins-message-container'>
                    <div className='fv-help-block'>{formik.errors.tipo_usuario}</div>
                  </div>
                )}
              </div>

              <div className='card-footer d-flex justify-content-end py-6 px-9'>
                <button type='submit' className='btn btn-primary' disabled={loading}>
                  {!loading && 'Guardar'}
                  {loading && (
                    <span className='indicator-progress' style={{ display: 'block' }}>
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

export { RolesForm }

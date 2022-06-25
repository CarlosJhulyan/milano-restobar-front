import { KTCard, KTCardBody } from '../../../../_metronic/helpers'
import * as Yup from "yup";
import {useFormik} from "formik";
import {httpClient} from "../../../../api/api";
import {ApiPath} from "../../../../api/constans";
import {useEffect, useState} from "react";
import {Restaurant} from "../../users/orders/constants";
import {openNotification} from "../../../../utils/openNotification";
import {Table} from "./constantsTable";

const tableSchema = Yup.object().shape({
  lgt_restaurante_id_lgt_restaurante: Yup.string().required('Seleccionar restaurante'),
  vta_numero_mesa: Yup.string().required('Completar número de mesa')
})

type Props = {
  getDataTable: (id: number) => void,
  getRestaurantsData: () => void,
  loading: boolean,
  restaurantDataSelector: Array<Restaurant>
}

const TableForm = ({ getDataTable, getRestaurantsData, restaurantDataSelector, loading }: Props) => {
  const [loadingSave, setLoadingSave] = useState(false)

  const formik = useFormik<Table>({
    initialValues: {

    },
    validationSchema: tableSchema,
    onSubmit: (values) => createTable(values),
  });

  const createTable = (values: Table) => {
    setLoadingSave(true)
    httpClient.post(ApiPath.Table.Create, {
      codRestaurante: values.lgt_restaurante_id_lgt_restaurante,
      numMesa: values.vta_numero_mesa
    })
      .then(response => {
        if (response.data.success)
          openNotification('Mesa', 'success', response.data.message)
        else
          openNotification('Mesa', 'warning', response.data.message)
        setLoadingSave(false)
        getDataTable(1)
        formik.resetForm()
      })
      .catch(e => console.log(e)).catch()
  }

  useEffect(() => {
    getRestaurantsData();
  }, [])

  return (
    <KTCard>
      <div className='card-header border-0 pt-6'>
        <div className='card-title'>
          Crear nueva mesa
        </div>
      </div>
      <KTCardBody className='py-4'>
        <form
          onSubmit={formik.handleSubmit}
          noValidate
          className='form'
        >
          <div className="row">
            <div className="col">
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Restaurante</label>
                <div className='col-lg-8 fv-row'>
                  <select
                    className='form-select form-select-solid form-select-lg'
                    {...formik.getFieldProps('lgt_restaurante_id_lgt_restaurante')}
                  >
                    <option value=''>Seleccionar restaurante...</option>
                    {restaurantDataSelector.map(item => (
                      <option key={item.id_lgt_restaurante} value={item.id_lgt_restaurante}>{item.lgt_nombre_resturante}</option>
                    ))}
                  </select>
                  {formik.touched.lgt_restaurante_id_lgt_restaurante && formik.errors.lgt_restaurante_id_lgt_restaurante && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.lgt_restaurante_id_lgt_restaurante}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <div className='row mb-6'>
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Número de mesa</label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-select-solid form-select-lg'
                    {...formik.getFieldProps('vta_numero_mesa')}
                  />
                  {formik.touched.vta_numero_mesa && formik.errors.vta_numero_mesa && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.vta_numero_mesa}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end'>
            <button type='submit' className='btn btn-primary' disabled={loading || loadingSave}>
              {!loadingSave && 'Guardar Mesa'}
              {loadingSave && (
                <span className='indicator-progress' style={{display: 'block'}}>
                    Guardando...{' '}
                  <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
              )}
            </button>
          </div>
        </form>
      </KTCardBody>
    </KTCard>
  )
}

export {TableForm}

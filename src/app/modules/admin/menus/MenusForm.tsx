import { KTCard, KTCardBody } from '../../../../_metronic/helpers'
import * as Yup from "yup";
import {useFormik} from "formik";
import {Menu, MenuFetch} from "./constants";
import {httpClient} from "../../../../api/api";
import {ApiPath} from "../../../../api/constans";
import {useEffect, useState} from "react";
import {Restaurant} from "../../users/orders/constants";
import {openNotification} from "../../../../utils/openNotification";

const menuSchema = Yup.object().shape({
  lgt_restaurante_id_lgt_restaurante: Yup.string().required('Seleccionar restaurante'),
  vta_descripcion_carta: Yup.string().required('Completar descripción')
})

type Props = {
  currentMenu: Menu,
  getDataMenu: () => void
}

const MenusForm = ({ currentMenu, getDataMenu }: Props) => {
  const [loading, setLoading] = useState(false)
  const [loadingSave, setLoadingSave] = useState(false)
  const [restaurantDataSelector, setRestaurantDataSelector] = useState<Array<Restaurant>>([])

  const formik = useFormik<Menu>({
    initialValues: currentMenu,
    validationSchema: menuSchema,
    onSubmit: (values) => createMenu(values),
  });

  const getRestaurantsData = () => {
    setLoading(true)
    httpClient.get(ApiPath.Restaurants.List)
      .then(response => {
        setRestaurantDataSelector(response.data.data)
        setLoading(false)
      })
      .catch(e => console.log(e))
  }

  const createMenu = (values: Menu) => {
    setLoadingSave(true)
    httpClient.post(ApiPath.Menus.Create, {
      codRestaurante: values.lgt_restaurante_id_lgt_restaurante,
      descripcion: values.vta_descripcion_carta
    })
      .then(response => {
        if (response.data.success)
          openNotification('Carta', 'success', response.data.message)
        else
          openNotification('Carta', 'warning', response.data.message)
        setLoadingSave(false)
        getDataMenu()
      })
      .catch(e => console.log(e)).catch()
  }

  useEffect(() => {
    getRestaurantsData();
  }, [])

  useEffect(() => {

  }, [currentMenu])

  return (
    <KTCard>
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
                <label className='col-lg-4 col-form-label required fw-bold fs-6'>Descripción</label>
                <div className='col-lg-8 fv-row'>
                  <input
                    type='text'
                    className='form-control form-select-solid form-select-lg'
                    {...formik.getFieldProps('vta_descripcion_carta')}
                  />
                  {formik.touched.vta_descripcion_carta && formik.errors.vta_descripcion_carta && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>{formik.errors.vta_descripcion_carta}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className='card-footer d-flex justify-content-end'>
            <button type='submit' className='btn btn-primary' disabled={loading || loadingSave}>
              {!loadingSave && 'Guardar Menu'}
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

export {MenusForm}

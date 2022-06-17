import { useFormik } from 'formik'
import { ChangeEvent, useEffect, useState } from 'react'
import * as Yup from 'yup'
import { httpClient } from '../../../../../api/api'
import { ApiPath } from '../../../../../api/constans'
import { KTCard, KTCardBody } from '../../../../../_metronic/helpers'
import { Loading } from '../../Loading'
import { Menu, Restaurant } from '../constants'
import { cardSelectType } from './MakeOrderPage'

const menuSchema = Yup.object().shape({
  id_vta_carta: Yup.string().required('Seleccionar menu'),
  lgt_restaurante_id_lgt_restaurante: Yup.string().required('Seleccionar restaurante')
})

type Props = {
  cardSelect: string,
  setCardSelect: (value: cardSelectType) => void,
  setDataMenu: (menu: Menu) => void
}

const MenuSelector = ({ cardSelect, setCardSelect, setDataMenu }: Props) => {
  const [data, setData] = useState<Menu>({
    lgt_restaurante_id_lgt_restaurante: 1
  })
  const [restaurantDataSelector, setRestaurantDataSelector] = useState<Array<Restaurant>>([])
  const [menuDataSelector, setMenuDataSelector] = useState<Array<Menu>>([])

  const [loading, setLoading] = useState(false)

  const formik = useFormik<Menu>({
    initialValues: data,
    validationSchema: menuSchema,
    onSubmit: (values) => handleSubmit(values),
  })

  const handleSubmit = async (values: Menu) => {
    setData(values)
    setDataMenu(values)
    setCardSelect('2')
  }

  const getRestaurantsData = async () => {
    setLoading(true)
    try {
      const { data: { data } } = await httpClient.get(ApiPath.Restaurants.List)
      setRestaurantDataSelector(data)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const getMenusData = async (codRestaurante: number) => {
    try {
      const { data: { data } } = await httpClient.post(ApiPath.Menus.ListByRestaurant, {
        codRestaurante
      })
      setMenuDataSelector(data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getMenusData(Number(formik.values.lgt_restaurante_id_lgt_restaurante))
  }, [formik.values.lgt_restaurante_id_lgt_restaurante])
  

  useEffect(() => {
    getRestaurantsData();
    
  }, [])

  return (
    <KTCard>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        // data-bs-target='#menu_selector'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Seleccionar Carta</h3>
        </div>
      </div>
      <KTCardBody>
        <div id="menu_selector" className={`collapse ${cardSelect === '1' ? 'show' : ''}`}>
          <form
            onSubmit={formik.handleSubmit}
            noValidate className='form'
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
                      {/* <option value=''>Seleccionar restaurante...</option> */}
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
              <div className="col">
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Carta</label>
                  <div className='col-lg-8 fv-row'>
                    <select
                      className='form-select form-select-solid form-select-lg'
                      {...formik.getFieldProps('id_vta_carta')}
                    >
                      <option value=''>Seleccionar menu...</option>
                      {menuDataSelector.map(item => (
                        <option key={item.id_vta_carta} value={item.id_vta_carta}>{item.vta_descripcion_carta}</option>
                      ))}
                    </select>
                    {formik.touched.id_vta_carta && formik.errors.id_vta_carta && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.id_vta_carta}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className='card-footer d-flex justify-content-end'>
              <button type='submit' className='btn btn-primary' disabled={loading}>
                Siguiente
              </button>
            </div>
          </form>
          
          {loading && <Loading />}
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export {MenuSelector}

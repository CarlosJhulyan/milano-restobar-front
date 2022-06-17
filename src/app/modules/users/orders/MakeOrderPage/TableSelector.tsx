import { useFormik } from 'formik'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import * as Yup from 'yup'
import { httpClient } from '../../../../../api/api'
import { ApiPath } from '../../../../../api/constans'
import { openNotification } from '../../../../../utils/openNotification'
import { KTCard, KTCardBody } from '../../../../../_metronic/helpers'
import { Loading } from '../../Loading'
import { Menu, OrderDetail, OrderHeader, Table } from '../constants'
import { ListTables } from './ListTables'
import { cardSelectType } from './MakeOrderPage'

const tableSchema = Yup.object().shape({
  // tipo_usuario: Yup.string().required('Seleccione el rol de usuario')
})

type Props = {
  cardSelect: string,
  setCardSelect: (value: cardSelectType) => void,
  dataMenu: Menu,
  setCodTable: (id: number) => void,
  orderHeader: OrderHeader,
  orderDetails: Array<OrderDetail>
}

const TableSelector = ({cardSelect, setCardSelect, dataMenu, setCodTable, orderHeader, orderDetails}: Props) => {
  const [data, setData] = useState<Table>({})
  const [tableList, setTableList] = useState<Array<Table>>([])
  const [tableSelected, setTableSelected] = useState<number>(1)
  const [loadingSaveOrder, setLoadingSaveOrder] = useState(false)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  
  const formik = useFormik<Table>({
    initialValues: data,
    validationSchema: tableSchema,
    onSubmit: () => handleSubmit()
  })

  const handleSubmit = async () => {
    setLoadingSaveOrder(true)
    try {
      const { data: { data, message, success } } = await httpClient.post(ApiPath.Order.Generate, {
        estado: orderHeader.estado,
        montoTotal: orderHeader.monto_total,
        codUsuario: orderHeader.id_usuario,
        codMesa: orderHeader.vta_mesa_id_mesa,
        detalles: orderDetails
      });

      if (success) {
        openNotification('Pedido', 'success', message)
        setSuccess(true)
      } else {
        openNotification('Pedido', 'warning', message)
      }
    } catch (error) {
      console.error(error)
    }
    setLoadingSaveOrder(false)
  }

  const getListPlates = async (codRestaurante: number) => {
    setLoading(true)
    const { data: { data } } = await httpClient.post(ApiPath.Restaurants.ListByRestaurant, { 
      codRestaurante
    });
    setTableList(data);
    setLoading(false)
  }

  const handleSelected = (id_vta_mesa?: number) => {
    setTableSelected(id_vta_mesa || 1)
    setCodTable(id_vta_mesa || 1)
  }

  useEffect(() => {
    getListPlates(dataMenu.lgt_restaurante_id_lgt_restaurante || 0);
  }, [dataMenu])

  return (
    <KTCard>
      <div
        className='card-header border-0 cursor-pointer'
        role='button'
        data-bs-toggle='collapse'
        // data-bs-target='#tables_selector'
      >
        <div className='card-title m-0'>
          <h3 className='fw-bolder m-0'>Seleccionar Mesa</h3>
        </div>
      </div>
      <KTCardBody>
        <div id="tables_selector" className={`collapse ${cardSelect === '3' ? 'show' : ''}`}>
          {(tableList.length === 0 && !loading) && (
            <div className="alert alert-warning" role="alert">
              No hay mesas en el restaurante seleccionado
            </div>
          )}
          <form
            onSubmit={formik.handleSubmit}
            noValidate className='form'
          >
            <ListTables
              tableSelected={tableSelected}
              handleSelected={handleSelected}
              data={tableList} 
              className={''}
            />
            <div className='card-footer d-flex justify-content-end'>
              <button
                type='button'
                onClick={() => setCardSelect('2')}
                className='btn btn-light me-3'
                data-kt-users-modal-action='cancel'
                // disabled={formik.isSubmitting || isUserLoading}
              >
                Anterior
              </button>
              <button type='submit' className='btn btn-primary' disabled={loading}>
                {!loadingSaveOrder && 'Guardar Pedido'}
                {loadingSaveOrder && (
                  <span className='indicator-progress' style={{display: 'block'}}>
                    Guardando...{' '}
                    <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                )}
              </button>
            </div>
          </form>
        </div>
        {(loading && cardSelect === '3') && <Loading />}
        {success && (
          <Navigate to='/' />
        )}
      </KTCardBody>
    </KTCard>
  )
}

export {TableSelector}

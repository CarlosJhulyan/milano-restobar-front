import {KTCard, KTCardBody, KTSVG} from "../../../../../_metronic/helpers"
import React, {useEffect, useState} from "react"
import {Link} from "react-router-dom"
import {OrderHeader} from "../../orders/constants"
import {httpClient} from "../../../../../api/api"
import {ApiPath} from "../../../../../api/constans"
import {Loading} from "../../Loading";
import moment from "moment";

const OrdersList = () => {
  const [orders, setOrders] = useState<Array<OrderHeader>>([])
  const [loading, setLoading] = useState<boolean>(false)

  const getOrders = () => {
    setLoading(true)
    httpClient.get(ApiPath.Order.GetCanceled)
      .then(response => {
        if (response.data.success) {
          setLoading(false)
          setOrders(response.data.data)
        }
      })
      .catch(e => console.error(e))
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <KTCard>
      <KTCardBody>
        <div className='table-responsive'>
          <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
            <thead>
            <tr className='fw-bolder text-muted'>
              <th className='min-w-150px'>Número de pedido</th>
              <th className='min-w-140px'>Mesa</th>
              <th className='min-w-120px'>Fecha</th>
              <th className='min-w-120px'>Hora</th>
              <th className='min-w-120px'>Mozo</th>
              <th className='min-w-120px'>Total</th>
            </tr>
            </thead>
            {!loading ? (
              <tbody>
              {orders.map(item => (
                <tr key={item.idvta_pedido_venta_cab || 0}>
                  <td>
                    <span className='text-danger fw-bolder fs-6'>
                      #{item.num_vta_pedido}
                    </span>
                  </td>
                  <td>
                    Mesa #{item.vta_numero_mesa}
                  </td>
                  <td>
                    {moment(item.fecha_crea, 'DD/MM/yyyy HH:mm:ss').format('DD/MM/yyyy')}
                  </td>
                  <td>
                    {moment(item.fecha_crea, 'DD/MM/yyyy HH:mm:ss').format('HH:mm:ss')}
                  </td>
                  <td>
                    {`${item.nombre} ${item.apellido_paterno}`}
                  </td>
                  <td className='text-danger fw-bolder fs-6'>
                    S/. {item.monto_total}
                  </td>
                </tr>
              ))}
              </tbody>
            ) : (
              <tbody>
              <tr>
                <Loading />
              </tr>
              <tr></tr>
              </tbody>
            )}
          </table>
        </div>
      </KTCardBody>
    </KTCard>
  )
}

export default OrdersList;
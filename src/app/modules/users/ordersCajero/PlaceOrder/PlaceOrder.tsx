import {KTCard, KTCardBody, KTSVG, toAbsoluteUrl} from "../../../../../_metronic/helpers"
import {getImageUrlBackend} from "../../../../../_metronic/helpers/getImageUrlBackend"
import React, {useEffect, useState} from "react"
import {Navigate, useSearchParams} from "react-router-dom"
import {httpClient} from "../../../../../api/api";
import {ApiPath} from "../../../../../api/constans";
import {CoinType, FormaPagoPedido, OrderDetail, OrderHeader} from "../../orders/constants";
import {openNotification} from "../../../../../utils/openNotification";
import {Loading} from "../../Loading";
import {useFormik} from "formik";
import * as Yup from "yup";

const formPaymentSchema = Yup.object().shape({
  tip_moneda: Yup.string().required('Seleccionar tipo de moneda'),
  im_pago: Yup.string().required('Agregue importe de pago')
})

const PlaceOrder = () => {
  const location = useSearchParams()
  const [id, setId] = useState<number>(Number(location[0].get('pedido')));
  const [dataHeader, setDataHeader] = useState<OrderHeader>({})
  const [dataDetails, setDataDetails] = useState<Array<OrderDetail>>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [loadingSaveOrder, setLoadingSaveOrder] = useState<boolean>(false)
  const [formaPagoOptions, setFormaPagoOptions] = useState<Array<CoinType>>([])

  const [subtotal, setSubtotal] = useState<number>(0)
  const [totalPagar, setTotalPagar] = useState<number>(0)
  const [igv, setIgv] = useState<number>(0)

  const formik = useFormik<FormaPagoPedido>({
    initialValues: {
      im_pago: 0
    },
    validationSchema: formPaymentSchema,
    onSubmit: (values) => {
      if (Number(values.im_pago) < totalPagar) {
        openNotification('Pedido', 'warning', 'El importe no puede ser menor al monto a pagar')
      } else {
        handlePlaceOrder(values)
      }
    }
  })

  const getOrderDetails = () => {
    setLoading(true)
    httpClient.post(ApiPath.Order.GetDetailsComplete, {
      codPedidoCabecera: id
    })
      .then(response => {
        if (response.data.success) {
          setLoading(false)
          setDataHeader(response.data.data.cabecera)
          setDataDetails(response.data.data.detalles)
        }
      })
      .catch(e => console.error(e))
  }

  const getCoinTypes = () => {
    httpClient.get(ApiPath.Global.GetCoinsType)
      .then(response => {
        if (response.data.success) {
          setFormaPagoOptions(response.data.data)
        }
      })
      .catch(e => console.error(e))
  }

  const handlePlaceOrder = async (values: FormaPagoPedido) => {
    setLoadingSaveOrder(true)
    try {
      const {data: {data, success}} = await httpClient.patch(ApiPath.Order.ChangeStatus, {
        codPedidoCabecera: id,
        estado: "C"
      })
      if (success) {
        const { data: { message, success: successFinal } } = await httpClient.post(ApiPath.Order.GeneratePaymentForm, {
          codFormaPago: '00001',
          numPedido: dataHeader.num_vta_pedido,
          imPago: values.im_pago,
          tipMoneda: values.tip_moneda,
          valTipoCambio: '3.95',
          valVuelto: Number(values.im_pago) - totalPagar,
          imTotalPago: dataHeader.monto_total
        })

        if (successFinal) {
          openNotification('Pedido', 'success', 'Pedido pagado correctamente')
          setLoadingSaveOrder(false)
          setId(0)
        } else {
          openNotification('Pedido', 'warning', message)
        }
      }
    } catch (e) {
      console.error(e)
    }
  }

  useEffect(() => {
    getOrderDetails()
    getCoinTypes()
  }, [])

  useEffect(() => {
    const total = dataDetails.reduce((previousValue, currentValue) => {
      if (currentValue.precio) return Number(previousValue) + Number(currentValue.precio)
      else return previousValue
    }, 0)
    setSubtotal(total - (total*.18))
    setIgv(total*.18)
    setTotalPagar(total)
  }, [dataDetails])

  return (
    <KTCard>
      {(id && id !== 0) ? (
      <KTCardBody>
        {!loading ? (
          <div className="row">
            <div className="col-4">
              <div className="row mt-5">
                <div className="col text-uppercase">Mesa:</div>
                <div className="col text-primary">{dataHeader.vta_numero_mesa}</div>
                <div className="col text-uppercase">Mozo:</div>
                <div className="col text-uppercase text-primary">{dataHeader.nombre} {dataHeader.apellido_paterno}</div>
              </div>
              <div className='table-responsive mt-5'>
                <table className='table align-middle gs-0 gy-3'>
                  <thead>
                  <tr>
                    <th className='p-0'>Cantidad</th>
                    <th className='p-0'>Platillo</th>
                    <th className='p-0'></th>
                    <th className='p-0'>Importe</th>
                  </tr>
                  </thead>
                  <tbody>
                  {dataDetails.map(item => (
                    <tr key={item.id_vta_plato || 0}>
                      <td>
                        {item.cantidad}
                      </td>
                      <td>
                        <a href='#' className='text-dark fw-bolder text-hover-primary mb-1 fs-6'>
                          {item.vta_desc_plato}
                        </a>
                      </td>
                      <td>
                        {item.vta_precio}
                      </td>
                      <td className='text-end'>
                        <span className='text-primary fs-7 fw-bolder'>{item.precio}</span>
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="col-1"></div>
            <div className="col-7">
              <div className='table-responsive'>
                <table className='table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4'>
                  <thead>
                  <tr className='fw-bolder text-muted'>
                    <th className='min-w-150px'>Descripción</th>
                    <th className='min-w-140px'>Precio</th>
                    <th className='min-w-120px'>Cant.</th>
                    <th className='min-w-100px text-end'>Total</th>
                  </tr>
                  </thead>
                  <tbody>
                  {dataDetails.map(item => (
                    <tr key={item.id_vta_plato || 0}>
                      <td>
                        <div className='d-flex align-items-center'>
                          <div className='symbol symbol-45px me-5'>
                            <img src={getImageUrlBackend(`/plates/${item.vta_ruta_imagen_plato}`)} alt={item.vta_desc_plato} />
                          </div>
                          <div className='d-flex justify-content-start flex-column'>
                        <span className='text-dark text-hover-primary fs-6'>
                          {item.vta_desc_plato}
                        </span>
                          </div>
                        </div>
                      </td>
                      <td className='text-end'>
                        {item.vta_precio}
                      </td>
                      <td className='text-end'>
                        {item.cantidad}
                      </td>
                      <td className='text-end'>
                        {item.precio}
                      </td>
                    </tr>
                  ))}
                  </tbody>
                </table>
              </div>
              <div className="row">
                <div className="col-5"></div>
                <div className="col-4 text-end">Sub total</div>
                <div className="col-2 text-end">
                  {subtotal}
                </div>
                <div className="col-1 text-end"></div>
              </div>
              <div className="row">
                <div className="col-5"></div>
                <div className="col-4 text-end">IGV</div>
                <div className="col-2 text-end">{igv}</div>
                <div className="col-1 text-end"></div>
              </div>
              <div className="row">
                <div className="col-5"></div>
                <div className="col-4 text-end">Otros cargos</div>
                <div className="col-2 text-end">0.00</div>
                <div className="col-1 text-end"></div>
              </div>
              <div className="row">
                <div className="col-5"></div>
                <div className="col-4 text-end">Monto a pagar</div>
                <div className="col-2 text-end">
                  {totalPagar}
                </div>
                <div className="col-1 text-end"></div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-8">
                <form noValidate onSubmit={formik.handleSubmit}>
                  <div className="row">
                    <div className="col">
                      <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Restaurante</label>
                        <div className='col-lg-8 fv-row'>
                          <select
                            className='form-select form-select-solid form-select-lg'
                            {...formik.getFieldProps('tip_moneda')}
                          >
                            <option value=''>Seleccionar tipo moneda...</option>
                            {formaPagoOptions.map((item, index) => (
                              <option key={index} value={item.cod_moneda}>{item.des_moneda}</option>
                            ))}
                          </select>
                          {formik.touched.tip_moneda && formik.errors.tip_moneda && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{formik.errors.tip_moneda}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col">
                      <div className='row mb-6'>
                        <label className='col-lg-4 col-form-label required fw-bold fs-6'>Importe pago</label>
                        <div className='col-lg-8 fv-row'>
                          <input
                            className='form-control'
                            {...formik.getFieldProps('im_pago')}
                            type='number'
                          />
                          {formik.touched.im_pago && formik.errors.im_pago && (
                            <div className='fv-plugins-message-container'>
                              <div className='fv-help-block'>{formik.errors.im_pago}</div>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex justify-content-end mt-5'>
                    <button
                      type='button'
                      onClick={() => setId(0)}
                      className='btn btn-light me-3'
                      data-kt-users-modal-action='cancel'
                      // disabled={formik.isSubmitting || isUserLoading}
                    >
                      Cancelar
                    </button>
                    <button
                      type='submit'
                      className='btn btn-primary'
                      disabled={loading}
                    >
                      {!loadingSaveOrder && 'Realizar Pago'}
                      {loadingSaveOrder && (
                        <span className='indicator-progress' style={{display: 'block'}}>
                    procesando...{' '}
                          <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                  </span>
                      )}
                    </button>
                  </div>
                </form>
              </div>
              <div className="col-4">
                <div className="row w-100">
                  <div className="col-3"></div>
                  <div className="col-5 text-end">Importe</div>
                  <div className="col-4 text-end">
                    {formik.values.im_pago}
                  </div>
                </div>
                <div className="row w-100">
                  <div className="col-3"></div>
                  <div className="col-5 text-end">Vuelto</div>
                  <div className="col-4 text-end">
                    {Number(formik.values.im_pago) - totalPagar > 0 ? Number(formik.values.im_pago) - totalPagar : '-'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : <Loading />}
      </KTCardBody>
      ) : <Navigate to='/pedidos' />}
    </KTCard>
  )
}

export default PlaceOrder;
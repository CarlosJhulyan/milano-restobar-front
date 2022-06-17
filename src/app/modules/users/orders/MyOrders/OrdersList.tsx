/* eslint-disable jsx-a11y/anchor-is-valid */
import { useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { httpClient } from '../../../../../api/api'
import { ApiPath } from '../../../../../api/constans'
import { KTCard, KTCardBody, KTSVG } from '../../../../../_metronic/helpers'
import { useAuth } from '../../../auth'
import { Loading } from '../../Loading'
import { OrderHeader } from '../constants'
import { ItemOrderList } from './ItemOrderList'
import * as Yup from 'yup'
import { openNotification } from '../../../../../utils/openNotification'
import clsx from 'clsx'

type Props = {
  className: string
}

const OrdersList: React.FC<Props> = ({className}) => {
  const [listOrders, setListOrders] = useState<Array<OrderHeader>>([])
  const { currentUser } = useAuth()
  const [loadingListOrders, setLoadingListOrders] = useState(false)
  const [visibleModal, setVisibleModal] = useState(false)
  const [idOrderCurrent, setIdOrderCurrent] = useState<number>(0)

  const getListOrders = async () => {
    setLoadingListOrders(true)
    try {
      const { data: { data } } = await httpClient.post(ApiPath.Order.RecentsByUser, {
        codUsuario: currentUser?.id_cme_usuario
      })
      setListOrders(data)
      console.log()
      
    } catch (error) {
      console.error(error)
    }
    setLoadingListOrders(false)
  }

  const handleSetItemSelect = (id: number) => {
    setIdOrderCurrent(id)
    setVisibleModal(true)
  }

  useEffect(() => {
    getListOrders()
  }, [])

  return (
    <KTCard>
      <KTCardBody>
        <div className={`card ${className}`}>
          <div className='card-header border-0 pt-5'>
            <h3 className='card-title align-items-start flex-column'>
              <span className='card-label fw-bolder fs-3 mb-1'>Pedidos Recientes</span>
              <span className='text-muted mt-1 fw-bold fs-7'>{listOrders.length} Pedidos encontrados</span>
            </h3>
          </div>
          <div className='card-body py-3'>
            <div className='table-responsive'>
              <table className='table table-row-bordered table-row-gray-100 align-middle gs-0 gy-3'>
                <thead>
                  <tr className='fw-bolder text-muted'>
                    {/* <th className='w-25px'>
                      <div className='form-check form-check-sm form-check-custom form-check-solid'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value='1'
                          data-kt-check='true'
                          data-kt-check-target='.widget-13-check'
                        />
                      </div>
                    </th> */}
                    <th className='min-w-130px'>Número de Pedido</th>
                    <th className='min-w-140px'>Fecha Creación</th>
                    <th className='min-w-120px'>Fecha Edición</th>
                    <th className='min-w-130px'>Mesa</th>
                    <th className='min-w-140px'>Monto Total</th>
                    <th className='min-w-100px'>Estado</th>
                    <th className='min-w-100px text-end'>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {listOrders.map(item => (
                    <ItemOrderList
                      handleSetItemSelect={handleSetItemSelect}
                      key={item.idvta_pedido_venta_cab}
                      order={item}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          {loadingListOrders && <Loading />}
        </div>
        {visibleModal && (
          <ModalUpdateStatusOrder
            getListOrders={getListOrders}
            setVisible={setVisibleModal}
            idOrderCurrent={idOrderCurrent}
          />
        )}
      </KTCardBody>
    </KTCard>
  )
}

type PropsModal = {
  setVisible: (flag: boolean) => void,
  idOrderCurrent: number,
  getListOrders: () => void
}

const StatusOrderSchema = Yup.object().shape({
  estado: Yup.string()
    .required('Estado requerido'),
})

const ModalUpdateStatusOrder = ({ setVisible, idOrderCurrent, getListOrders }: PropsModal) => {
  const [loading, setLoading] = useState(false)
  const formik = useFormik({
    initialValues: {
      estado: ''
    },
    validationSchema: StatusOrderSchema,
    onSubmit: (values) => changeStatusOrder(values)
  })

  const changeStatusOrder = async (values: {estado: string}) => {
    setLoading(true)
    try {
      const { data: { message, success } } = await httpClient.patch(ApiPath.Order.ChangeStatus, {
        estado: values.estado,
        codPedidoCabecera: idOrderCurrent
      })

      if (success) {
        openNotification('Pedido', 'success', message)
        setVisible(false)
        getListOrders()
      } else {
        openNotification('Pedido', 'warning', message)
      }
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  useEffect(() => {

  }, [idOrderCurrent])

  return (
    <>
      <div
        className='modal fade show d-block'
        id='modal-update-status-order'
        role='dialog'
        tabIndex={-1}
        aria-modal='true'
      >
        <div className='modal-dialog modal-dialog-centered mw-450px'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h2 className='fw-bolder'>Actualizar Pedido</h2>
              <div
                className='btn btn-icon btn-sm btn-active-icon-primary'
                data-kt-users-modal-action='close'
                onClick={() => setVisible(false)}
                style={{cursor: 'pointer'}}
              >
                <KTSVG path='/media/icons/duotune/arrows/arr061.svg' className='svg-icon-1' />
              </div>
            </div>
            <div className='modal-body scroll-y'>
              <form 
                onSubmit={formik.handleSubmit}
                noValidate 
                className='form'
              >
                <div className='row mb-6'>
                  <label className='col-lg-4 col-form-label required fw-bold fs-6'>Estado</label>
                  <div className='col-lg-8 fv-row'>
                    <select
                      className='form-select form-select-solid form-select-lg'
                      {...formik.getFieldProps('estado')}
                    >
                      <option value=''>Seleccionar estado...</option>
                      <option value='C'>Cancelado</option>
                      <option value='A'>Atendido</option>
                      <option value='N'>Anulado</option>
                    </select>
                    {formik.touched.estado && formik.errors.estado && (
                      <div className='fv-plugins-message-container'>
                        <div className='fv-help-block'>{formik.errors.estado}</div>
                      </div>
                    )}
                  </div>
                </div>
                <div className='fv-row mb-7'>
                  <label className='fw-bold fs-6 mb-2'>Motivo</label>
                  <textarea
                    {...formik.getFieldProps('motivo')}
                    name='motivo'
                    className={clsx(
                      'form-control form-control-solid mb-3 mb-lg-0',
                      // {'is-invalid': formik.touched.motivo && formik.errors.motivo},
                      // {
                      //   'is-valid': formik.touched.motivo && !formik.errors.motivo,
                      // }
                    )}
                    autoComplete='off'
                    // disabled={formik.isSubmitting || isUserLoading}
                  ></textarea>
                  {/* {formik.touched.nombre && formik.errors.nombre && (
                    <div className='fv-plugins-message-container'>
                      <div className='fv-help-block'>
                        <span role='alert'>{formik.errors.nombre}</span>
                      </div>
                    </div>
                  )} */}
                </div>
                <div className='d-flex justify-content-end'>
                  <button 
                    type='submit' 
                    className='btn btn-primary' 
                    disabled={loading}
                  >
                    {!loading && 'Actualizar Pedido'}
                    {loading && (
                      <span className='indicator-progress' style={{display: 'block'}}>
                        Guardando...{' '}
                        <span className='spinner-border spinner-border-sm align-middle ms-2'></span>
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* <div className='modal-backdrop fade show'></div> */}
    </>
  )
}

export {OrdersList}

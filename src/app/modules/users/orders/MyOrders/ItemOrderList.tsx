import moment from "moment"
import { KTSVG } from "../../../../../_metronic/helpers"
import { OrderHeader } from "../constants"

type Props = {
  order: OrderHeader,
  handleSetItemSelect: (id: number) => void
}

const ItemOrderList = ({ order, handleSetItemSelect }: Props) => {
  return (
    <tr>
      {/* <td>
        <div className='form-check form-check-sm form-check-custom form-check-solid'>
          <input className='form-check-input widget-13-check' type='checkbox' value='1' />
        </div>
      </td> */}
      <td>
        <span className='text-dark fw-bolder text-hover-primary fs-6'>
          #{String(order.idvta_pedido_venta_cab).padStart(10, '0')}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
          {moment(order.fecha_creacion).format('DD/MM/yyyy')}
        </span>
        <span className='text-muted fw-bold text-muted d-block fs-7'>
          {moment(order.fecha_creacion).format('HH:mm:ss')}
        </span>
      </td>
      <td>
        <span className='text-dark fw-bolder text-hover-primary d-block mb-1 fs-6'>
          {moment(order.fecha_edicion).format('DD/MM/yyyy')}
        </span>
        <span className='text-muted fw-bold text-muted d-block fs-7'>
          {moment(order.fecha_edicion).format('HH:mm:ss')}
        </span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>
          Mesa #{order.vta_mesa_id_vta_mesa}
        </span>
      </td>
      <td className='text-dark fw-bolder text-hover-primary fs-6'>
        S/ {order.monto_total}
      </td>
      <td>
        {order.estado === 'P' && <span className='badge badge-light-warning'>Pendiente</span>}
        {order.estado === 'A' && <span className='badge badge-light-success'>Atendido</span>}
        {order.estado === 'C' && <span className='badge badge-light-info'>Cancelado</span>}
        {order.estado === 'N' && <span className='badge badge-light-danger'>Anulado</span>}
      </td>
      <td className='text-end'>
        <button
          type="button"
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/general/gen019.svg' className='svg-icon-3' />
        </button>
        <button
          type="button"
          onClick={() => handleSetItemSelect(order.idvta_pedido_venta_cab || 0)}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
        </button>
        {/* <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </a> */}
      </td>
    </tr>
  )
}

export {ItemOrderList}
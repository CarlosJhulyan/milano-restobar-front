/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import { KTSVG } from '../../../../../_metronic/helpers'
import { Table } from '../constants'

type Props = {
  className: string,
  data: Array<Table>,
  handleSelected: (id?: number) => void,
  tableSelected: number
}

const ListTables: React.FC<Props> = ({className, data, handleSelected, tableSelected}) => {
  return (
    <div className='card card-xl-stretch mb-5 mb-xl-8'>
      <div className='row g-5 g-xl-8'>
        {data.map(item => (
          <div className='col-md-3' key={item.id_vta_mesa}>
            <a onClick={() => handleSelected(item.id_vta_mesa)} className={`card ${tableSelected === item.id_vta_mesa ? 'bg-success' : 'bg-dark'} hoverable ${className}`} data-id={item.id_vta_mesa}>
              <div className='card-body'>
                <KTSVG path='/media/icons/duotune/ecommerce/ecm008.svg' className={`svg-icon-white svg-icon-3x ms-n1`} />
                <div className={`text-inverse-dark fw-bolder fs-2 mb-2 mt-5`}>#{item.vta_numero_mesa}</div>
                <div className={`fw-bold text-inverse-dark fs-7`}>Mesa</div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}

export {ListTables}

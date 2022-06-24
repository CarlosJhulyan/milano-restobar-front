import clsx from 'clsx'
import {Column} from 'react-table'
import {KTSVG} from '../../../../_metronic/helpers'
import {getImageUrlBackend} from '../../../../_metronic/helpers/getImageUrlBackend'
import {Restaurant} from './constants'
import {RestaurantesTableHeader} from './RestaurantesTableHeader'

const restaurantesTableColumns: ReadonlyArray<Column<Restaurant>> = [
  {
    Header: (props) => (
      <RestaurantesTableHeader tableProps={props} title='RUC' className='min-w-115px' />
    ),
    id: 'lg_ruc_resturante',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {props.data[props.row.index].lg_ruc_resturante}
          </a>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => (
      <RestaurantesTableHeader tableProps={props} title='Nombre' className='min-w-100px' />
    ),
    id: 'lgt_nombre_resturante',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {props.data[props.row.index].lgt_nombre_resturante}
          </a>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => (
      <RestaurantesTableHeader tableProps={props} title='Dirección' className='min-w-125px' />
    ),
    id: 'lgt_direccion',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {props.data[props.row.index].lgt_direccion_restaurante}
          </a>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => (
      <RestaurantesTableHeader tableProps={props} title='Horario' className='min-w-90px' />
    ),
    id: 'lgt_horario',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {`${props.data[props.row.index].lgt_horario_apertura} - ${
              props.data[props.row.index].lgt_horario_cierre
            }`}
          </a>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => (
      <RestaurantesTableHeader
        tableProps={props}
        title='Acciones'
        className='text-end min-w-50px'
      />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <div>
        <div className='d-flex justify-content-end flex-shrink-0'>
          <a
            onClick={() => props.deleteRow(props.data[props.row.index])}
            className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          >
            <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
          </a>
        </div>
      </div>
    ),
  },
]

export {restaurantesTableColumns}

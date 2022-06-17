import clsx from 'clsx'
import {Column} from 'react-table'
import { KTSVG } from '../../../../_metronic/helpers'
import { getImageUrlBackend } from '../../../../_metronic/helpers/getImageUrlBackend'
import { UserCustomHeader } from '../../apps/user-management/users-list/table/columns/UserCustomHeader'
import { Menu } from './constants'


const menusTableColumns: ReadonlyArray<Column<Menu>> = [
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Nombre' className='min-w-125px' />,
    id: 'vta_descripcion_carta',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        {/* <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
          <a href='#'>
            {props.data[props.row.index].vta_ruta_imagen_plato ? (
              <div className='symbol-label'>
                <img src={getImageUrlBackend(`/plates/${props.data[props.row.index].vta_ruta_imagen_plato}`)} alt={props.data[props.row.index].vta_nombre_plato} className='w-100' />
              </div>
            ) : (
              <div
                className={clsx(
                  'symbol-label fs-3',
                  `bg-light-primary`,
                  `text-primary`
                )}
              >
                {props.data[props.row.index].vta_nombre_plato}
              </div>
            )}
          </a>
        </div> */}
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {props.data[props.row.index].vta_descripcion_carta}
          </a>
        </div>
      </div>
    )
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Restaurante' className='min-w-125px' />
    ),
    id: 'vta_restaurante_carta',
    Cell: ({...props}) => <span className='fw-bolder d-block fs-5'>{props.data[props.row.index].vta_restaurante_carta}</span>,
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Acciones' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <div>
        <div className='d-flex justify-content-end flex-shrink-0'>
          <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </a>
          <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'>
            <KTSVG
              path='/media/icons/duotune/general/gen027.svg'
              className='svg-icon-3'
            />
          </a>
        </div>
      </div>
    ),
  },
]

export {menusTableColumns}

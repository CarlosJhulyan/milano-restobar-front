import clsx from 'clsx'
import {Column} from 'react-table'
import { KTSVG } from '../../../../_metronic/helpers'
import { getImageUrlBackend } from '../../../../_metronic/helpers/getImageUrlBackend'
import { UserCustomHeader } from '../../apps/user-management/users-list/table/columns/UserCustomHeader'
import { Plate } from './constants'


const platesTableColumns: ReadonlyArray<Column<Plate>> = [
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Platillo' className='min-w-125px' />,
    id: 'vta_nombre_plato',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
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
        </div>
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {props.data[props.row.index].vta_nombre_plato}
          </a>
        </div>
      </div>
    )
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Precio' className='min-w-125px' />
    ),
    id: 'vta_precio',
    Cell: ({...props}) => (
      <span className='fw-bolder d-block fs-5'>S/ {props.data[props.row.index].vta_precio}</span>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Descripción' className='min-w-125px' />
    ),
    id: 'vta_desc_plato',
    Cell: ({...props}) => (
      <span>{props.data[props.row.index].vta_desc_plato}</span>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Dificultad' className='min-w-125px' />
    ),
    id: 'vta_dificultad_plato',
    Cell: ({...props}) => (
      <>
        {props.data[props.row.index].vta_peso_dificultad === '1' && <span className={`text-success`}>{props.data[props.row.index].vta_dificultad_plato}</span>}
        {props.data[props.row.index].vta_peso_dificultad === '2' && <span className={`text-warning`}>{props.data[props.row.index].vta_dificultad_plato}</span>}
        {props.data[props.row.index].vta_peso_dificultad === '3' && <span className={`text-info`}>{props.data[props.row.index].vta_dificultad_plato}</span>}
      </>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Categoría' className='min-w-125px' />
    ),
    id: 'vta_categoria_plato',
    Cell: ({...props}) => (
      <span>{props.data[props.row.index].vta_categoria_plato}</span>
    ),
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

export {platesTableColumns}

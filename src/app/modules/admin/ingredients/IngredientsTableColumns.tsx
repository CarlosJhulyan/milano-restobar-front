import clsx from 'clsx'
import {Column} from 'react-table'
import { KTSVG } from '../../../../_metronic/helpers'
import { getImageUrlBackend } from '../../../../_metronic/helpers/getImageUrlBackend'
import { UserActionsCell } from '../../apps/user-management/users-list/table/columns/UserActionsCell'
import { UserCustomHeader } from '../../apps/user-management/users-list/table/columns/UserCustomHeader'
import { UserInfoCell } from '../../apps/user-management/users-list/table/columns/UserInfoCell'
import { UserLastLoginCell } from '../../apps/user-management/users-list/table/columns/UserLastLoginCell'
import { UserSelectionCell } from '../../apps/user-management/users-list/table/columns/UserSelectionCell'
import { UserSelectionHeader } from '../../apps/user-management/users-list/table/columns/UserSelectionHeader'
import { UserTwoStepsCell } from '../../apps/user-management/users-list/table/columns/UserTwoStepsCell'
import { Ingredient } from './constants'


const ingredientsTableColumn: ReadonlyArray<Column<Ingredient>> = [
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Ingrediente' className='min-w-125px' />,
    id: 'nombre',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        {/* <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
          <a href='#'>
            {props.data[props.row.index].avatar ? (
              <div className='symbol-label'>
                <img src={getImageUrlBackend(`/avatar/${props.data[props.row.index].avatar}`)} alt={props.data[props.row.index].nombre} className='w-100' />
              </div>
            ) : (
              <div
                className={clsx(
                  'symbol-label fs-3',
                  `bg-light-primary`,
                  `text-primary`
                )}
              >
                {props.data[props.row.index].nombre[0]}
              </div>
            )}
          </a>
        </div> */}
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {props.data[props.row.index].nombre}
          </a>
        </div>
      </div>
    )
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Precio de compra' className='min-w-125px' />
    ),
    id: 'precio',
    Cell: ({...props}) => (
      <div>
        <span className='text-muted fw-bold d-block fs-7'>Costo unitario</span>
        <span className='text-dark fw-bolder d-block fs-5'>S/ {props.data[props.row.index].precio_compra}</span>
      </div>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Stock Físico' className='min-w-125px' />
    ),
    id: 'stock_fisico',
    Cell: ({...props}) => (
      <>
        {props.data[props.row.index].stock_fisico === 0 && <span className='text-danger fs-7 fw-bolder'>{props.data[props.row.index].stock_fisico}</span>}
        {(props.data[props.row.index].stock_fisico > 0 && props.data[props.row.index].stock_fisico < 50) && <span className='text-warning fs-7 fw-bolder'>{props.data[props.row.index].stock_fisico}</span>}
        {props.data[props.row.index].stock_fisico >= 50 && <span className='text-success fs-7 fw-bolder'>{props.data[props.row.index].stock_fisico}</span>}
      </>
    ),
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Medida' className='min-w-125px' />
    ),
    id: 'medida',
    Cell: ({...props}) => (
      // <div className='text-center'>
        <span>{props.data[props.row.index].unidad_medida}</span>
      // </div>
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

export {ingredientsTableColumn}

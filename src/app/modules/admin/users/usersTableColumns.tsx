import clsx from 'clsx'
import { PropsWithChildren } from 'react'
import {Column, HeaderProps} from 'react-table'
import { KTSVG } from '../../../../_metronic/helpers'
import { getImageUrlBackend } from '../../../../_metronic/helpers/getImageUrlBackend'
import { UserActionsCell } from '../../apps/user-management/users-list/table/columns/UserActionsCell'
import { UserCustomHeader } from '../../apps/user-management/users-list/table/columns/UserCustomHeader'
import { UserInfoCell } from '../../apps/user-management/users-list/table/columns/UserInfoCell'
import { UserLastLoginCell } from '../../apps/user-management/users-list/table/columns/UserLastLoginCell'
import { UserSelectionCell } from '../../apps/user-management/users-list/table/columns/UserSelectionCell'
import { UserSelectionHeader } from '../../apps/user-management/users-list/table/columns/UserSelectionHeader'
import { UserTwoStepsCell } from '../../apps/user-management/users-list/table/columns/UserTwoStepsCell'
import { User } from './constants'


const usersTableColumn: ReadonlyArray<Column<User>> = [
  // {
  //   Header: (props) => <UserSelectionHeader tableProps={props} />,
  //   id: 'id',
  //   Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id_cme_usuario} />,
  // },
  {
    Header: (props) => <HeaderTable tableProps={props} title='Usuario' className='min-w-125px' />,
    id: 'nombre',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='symbol symbol-circle symbol-50px overflow-hidden me-3'>
          <a href='#'>
            {props.data[props.row.index].avatar ? (
              <div className='symbol-label'>
                <img src={getImageUrlBackend(`/avatars/${props.data[props.row.index].avatar}`)} alt={props.data[props.row.index].nombre} className='w-100' />
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
        </div>
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {props.data[props.row.index].nombre}
          </a>
          <span>{props.data[props.row.index].correo}</span>
        </div>
      </div>
    )
  },
  {
    Header: (props) => (
      <HeaderTable tableProps={props} title='Apellidos' className='min-w-125px' />
    ),
    id: 'apellidos',
    Cell: ({...props}) => <span>{props.data[props.row.index].apellido_paterno} {props.data[props.row.index].apellido_materno}</span>,
  },
  {
    Header: (props) => (
      <HeaderTable tableProps={props} title='Celular' className='min-w-125px' />
    ),
    id: 'celular',
    Cell: ({...props}) => <span>+51 {props.data[props.row.index].celular}</span>,
  },
  {
    Header: (props) => (
      <HeaderTable tableProps={props} title='Fecha nacimiento' className='min-w-125px' />
    ),
    id: 'fecha_nac',
    Cell: ({...props}) => <span>{props.data[props.row.index].fecha_nacimiento}</span>,
  },
  {
    Header: (props) => <HeaderTable tableProps={props} title='Rol' className='min-w-125px' />,
    id: 'role',
    Cell: ({...props}) => (
      <div className='text-end'>
        {props.data[props.row.index].tipo_usuario === 'M' && <span className='badge badge-light-success fw-bold me-1'>Mozo</span>}
        {props.data[props.row.index].tipo_usuario === 'C' && <span className='badge badge-light-info fw-bold me-1'>Cocinero</span>}
        {props.data[props.row.index].tipo_usuario === 'O' && <span className='badge badge-light-warning fw-bold me-1'>Cajero</span>}
        {!props.data[props.row.index].tipo_usuario && <span className='badge badge-light-danger fw-bold me-1'>Sin asignar</span>}
      </div>
    )
  },
  {
    Header: (props) => (
      <HeaderTable tableProps={props} title='Acciones' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <div>
        <div className='d-flex justify-content-end flex-shrink-0'>
          {/* <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG
              path='/media/icons/duotune/general/gen019.svg'
              className='svg-icon-3'
            />
          </a> */}
          <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'
          >
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </a>
          <a href='#' className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
          >
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

type PropsHeader = {
  className?: string
  title?: string
  tableProps: PropsWithChildren<HeaderProps<User>>
}

const HeaderTable = ({ tableProps, title, className }: PropsHeader) => (
  <>
    <th
        {...tableProps.column.getHeaderProps()}
        className={clsx(
          className,
          // isSelectedForSorting && order !== undefined && `table-sort-${order}`
        )}
        style={{cursor: 'pointer'}}
        // onClick={sortColumn}
      >
        {title}
      </th>
  </>
)

export {usersTableColumn}

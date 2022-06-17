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
import { User } from './constats'



const rolesTableColumn: ReadonlyArray<Column<User>> = [
  // {
  //   Header: (props) => <UserSelectionHeader tableProps={props} />,
  //   id: 'id',
  //   Cell: ({...props}) => <UserSelectionCell id={props.data[props.row.index].id_cme_usuario} />,
  // },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Usuario' className='min-w-125px' />,
    id: 'nombres',
    Cell: ({...props}) => (
      <div className='d-flex flex-column'>
        <a href='#' className='text-gray-800 text-hover-primary mb-1'>
          {props.data[props.row.index].nombre}
        </a>
        <span>{props.data[props.row.index].apellido_paterno} {props.data[props.row.index].apellido_materno}</span>
      </div>
    )
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Fecha registro' className='min-w-125px' />
    ),
    id: 'fecha_nac',
    Cell: ({...props}) => <span>{props.data[props.row.index].fecha_creacion}</span>,
  },
  {
    Header: (props) => <UserCustomHeader tableProps={props} title='Rol' className='min-w-125px' />,
    id: 'role',
    Cell: ({...props}) => (
      <div>
        {props.data[props.row.index].tipo_usuario === 'M' && <span className='badge badge-light-success fw-bold me-1'>Mozo</span>}
        {props.data[props.row.index].tipo_usuario === 'C' && <span className='badge badge-light-info fw-bold me-1'>Cocinero</span>}
        {props.data[props.row.index].tipo_usuario === 'O' && <span className='badge badge-light-warning fw-bold me-1'>Cajero</span>}
        {!props.data[props.row.index].tipo_usuario && <span className='badge badge-light-danger fw-bold me-1'>Sin asignar</span>}
      </div>
    )
  },
  {
    Header: (props) => (
      <UserCustomHeader tableProps={props} title='Acciones' className='text-end min-w-100px' />
    ),
    id: 'actions',
    Cell: ({...props}) => (
      <div>
        <div className='d-flex justify-content-end flex-shrink-0'>
          <button className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1'>
            <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
          </button>
        </div>
      </div>
    ),
  },
]

export {rolesTableColumn}

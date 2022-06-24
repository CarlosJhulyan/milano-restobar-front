import clsx from 'clsx'
import {Column} from 'react-table'
import {KTSVG} from '../../../../_metronic/helpers'
import {getImageUrlBackend} from '../../../../_metronic/helpers/getImageUrlBackend'
// import {Restaurant} from './constants'
import { Receta } from './constats'
import {RecetasTableHeader} from './RecetasTableHeader'

const recetasTableColumns: ReadonlyArray<Column<Receta>> = [
  {
    Header: (props) => (
      <RecetasTableHeader tableProps={props} title='ID' className='min-w-115px' />
    ),
    id: 'id_cme_receta',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {props.data[props.row.index].id_cme_receta}
          </a>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => (
      <RecetasTableHeader tableProps={props} title='Descripcion' className='min-w-100px' />
    ),
    id: 'descripcion',
    Cell: ({...props}) => (
      <div className='d-flex align-items-center'>
        <div className='d-flex flex-column'>
          <a href='#' className='text-gray-800 text-hover-primary mb-1'>
            {props.data[props.row.index].descripcion}
          </a>
        </div>
      </div>
    ),
  },
  {
    Header: (props) => (
      <RecetasTableHeader
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

export {recetasTableColumns}

import {KTSVG} from "../../../../_metronic/helpers";
import {Table} from "./constantsTable";

type Props = {
  table: Table,
  handleDeleteTable: (id: number) => void
}

const ItemTableList = ({ table, handleDeleteTable }: Props) => {

  return (
    <tr>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>
          {table.vta_numero_mesa}
        </span>
      </td>
      <td>
        <span className='text-muted fw-bold text-muted d-block fs-7'>
          {table.lgt_nombre_resturante}
        </span>
      </td>
      <td className='text-end'>
        <button
          onClick={() => handleDeleteTable(table.id_vta_mesa || 0)}
          className='btn btn-icon btn-bg-light btn-active-color-primary btn-sm'
        >
          <KTSVG path='/media/icons/duotune/general/gen027.svg' className='svg-icon-3' />
        </button>
      </td>
    </tr>
  )
}

export {ItemTableList}
import clsx from 'clsx'
import { FC } from 'react'
import { Row } from 'react-table'
import { User } from '../../core/_models'

type Props = {
  row: Row<User>,
  handleShow?: () => any,
}

const CustomRow: FC<Props> = ({ row, handleShow }) => {
  return (
    <tr {...row.getRowProps()}>
      {row.cells.map((cell) => {

        return (
          <td
            {...cell.getCellProps()}
            className={clsx({ 'text-end min-w-100px': cell.column.id === 'actions' })}
          >
            {cell.render('Cell', {
              handleShow,
            })}
          </td>
        )
      })}
    </tr>
  );
}

export { CustomRow }

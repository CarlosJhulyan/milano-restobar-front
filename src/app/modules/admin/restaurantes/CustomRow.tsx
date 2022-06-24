import clsx from 'clsx'
import {FC} from 'react'
import {Row} from 'react-table'

type Props = {
  row: Row
  methods: {editRow: (e: any) => void; deleteRow: (e: any) => void}
}

const CustomRow: FC<Props> = ({row, methods}) => (
  <tr {...row.getRowProps()}>
    {row.cells.map((cell) => {
      return (
        <td
          {...cell.getCellProps()}
          className={clsx({'text-end min-w-100px': cell.column.id === 'actions'})}
        >
          {cell.render('Cell', methods)}
        </td>
      )
    })}
  </tr>
)

export {CustomRow}

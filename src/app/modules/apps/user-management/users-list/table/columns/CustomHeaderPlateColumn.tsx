import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import { Plate } from '../../../../../admin/plates/constantsPlates'
import {User} from '../../core/_models'

type Props = {
  column: ColumnInstance<Plate>
}

const CustomHeaderPlateColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {CustomHeaderPlateColumn}

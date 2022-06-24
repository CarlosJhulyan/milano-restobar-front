import {FC} from 'react'
import {ColumnInstance} from 'react-table'
import { Ingredient } from '../../../../../admin/ingredients/constantsIngrediente'
import {User} from '../../core/_models'

type Props = {
  column: ColumnInstance<Ingredient>
}

const CustomHeaderIngredientesColumn: FC<Props> = ({column}) => (
  <>
    {column.Header && typeof column.Header === 'string' ? (
      <th {...column.getHeaderProps()}>{column.render('Header')}</th>
    ) : (
      column.render('Header')
    )}
  </>
)

export {CustomHeaderIngredientesColumn}
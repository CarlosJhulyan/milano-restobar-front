import { FC } from "react"
import { 
  PageTitle,
} from "../../../../_metronic/layout/core"
import { IngredientsList } from "./IngredientsList"

const IngredientsPage: FC = () => {
  return (
    <>
      <PageTitle>Ingredientes</PageTitle>
      <IngredientsList />
    </>
  )
}

export default IngredientsPage
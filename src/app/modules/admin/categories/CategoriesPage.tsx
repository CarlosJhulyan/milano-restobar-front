import {FC} from "react"
import {
  PageTitle,
} from "../../../../_metronic/layout/core"
import CategoriesList from "./CategoriesList";

const CategoriesPage: FC = () => {
  return (
    <>
      <PageTitle>Categorías</PageTitle>
      <CategoriesList />
    </>
  )
}

export default CategoriesPage
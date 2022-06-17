import { FC } from "react"
// import { KTSVG } from "../../../../_metronic/helpers"
import { 
  PageTitle,
} from "../../../../_metronic/layout/core"
import { MenusForm } from "./MenusForm"
import { MenusList } from "./MenusList"

const MenusPage: FC = () => {
  return (
    <>
      <PageTitle>Cartas</PageTitle>
      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-6'>
          <MenusList />
        </div>
        <div className='col-xl-6'>
          <MenusForm />
        </div>
      </div>
    </>
  )
}

export default MenusPage
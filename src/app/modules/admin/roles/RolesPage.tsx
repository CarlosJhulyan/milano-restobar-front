import { FC, useState } from "react"
import { KTCard, KTCardBody } from "../../../../_metronic/helpers"
import { 
  PageTitle,
} from "../../../../_metronic/layout/core"
import { Role } from "./constats"
import { RolesForm } from "./RolesForm"
import { RolesList } from "./RolesList"

const RolesPage: FC = () => {
  const [currentUser, setCurrentUser] = useState<Role>({});

  return (
    <>
      <PageTitle>Asignar Roles</PageTitle>
      <div className='row gy-5 g-xl-8'>
        <div className='col-xxl-6'>
          <RolesList />
        </div>
        <div className='col-xl-6'>
          <RolesForm currentUser={currentUser} />
        </div>
      </div>
    </>
  )
}

export default RolesPage
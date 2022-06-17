import { FC } from "react"
import { 
  PageTitle,
} from "../../../../_metronic/layout/core"
import { UsersList } from "./UsersList"

const UsersPage: FC = () => {
  return (
    <>
      <PageTitle>Usuarios</PageTitle>
      <UsersList />
    </>
  )
}

export default UsersPage
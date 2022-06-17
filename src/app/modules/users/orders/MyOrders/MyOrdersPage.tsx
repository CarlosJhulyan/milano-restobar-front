import { FC } from "react"
import { PageTitle } from "../../../../../_metronic/layout/core"
import { OrdersList } from "./OrdersList"


const MyOrdersPage: FC = () => {
  return (
    <>
      <PageTitle>Mis Pedidos</PageTitle>
      <OrdersList className="" />
    </>
  )
}

export default MyOrdersPage
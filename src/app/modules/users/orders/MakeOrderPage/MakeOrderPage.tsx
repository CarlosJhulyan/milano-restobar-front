import { FC, useState } from "react"
import { PageTitle } from "../../../../../_metronic/layout/core"
import { PlatesSelector } from "./PlatesSelector"
import { MenuSelector } from "./MenuSelector"
import { TableSelector } from "./TableSelector"
import { Menu, OrderDetail, OrderHeader } from "../constants"
import { useAuth } from "../../../auth"

export type cardSelectType = 
  | '1'
  | '2'
  | '3'
  | '4'

const MakeOrderPage: FC = () => {
  const { currentUser } = useAuth();
  const [cardSelect, setCardSelect] = useState<cardSelectType>('1');
  const [dataMenu, setDataMenu] = useState<Menu>({
    id_vta_carta: 0
  })
  const [orderDetails, setOrderDetails] = useState<Array<OrderDetail>>([])
  const [orderHeader, setOrderHeader] = useState<OrderHeader>({
    estado: 'P',
    id_usuario: currentUser?.id_cme_usuario
  })

  const handleSetDataMenu = (data: Menu) => {
    setDataMenu(data)
  }

  const handleSetCodTable = (vta_mesa_id_mesa: number) => {
    setOrderHeader({
      ...orderHeader,
      vta_mesa_id_mesa
    })
  }

  const handleSetTotal = (monto_total: number) => {
    setOrderHeader({
      ...orderHeader,
      monto_total
    })
  }

  const handleSetOrdersDetail = (details: Array<OrderDetail>) => {
    setOrderDetails(details)
  }

  return (
    <>
      <PageTitle>Realizar pedido</PageTitle>
      <MenuSelector
        setDataMenu={handleSetDataMenu}
        cardSelect={cardSelect}
        setCardSelect={setCardSelect} />
      <br />
      <PlatesSelector
        setOrderHeader={handleSetTotal}
        setOrderDetails={handleSetOrdersDetail}
        dataMenu={dataMenu}
        cardSelect={cardSelect}
        setCardSelect={setCardSelect} />
      <br />
      <TableSelector
        orderDetails={orderDetails}
        orderHeader={orderHeader}
        setCodTable={handleSetCodTable}
        dataMenu={dataMenu}
        cardSelect={cardSelect}
        setCardSelect={setCardSelect} />
    </>
  )
}

export default MakeOrderPage
import { FC } from "react"
import { 
  PageTitle,
} from "../../../../_metronic/layout/core"
import { PlatesList } from "./PlatesList"


const PlatesPage: FC = () => {
  return (
    <>
      <PageTitle>Platillos</PageTitle>
      <PlatesList />
    </>
  )
}

export default PlatesPage